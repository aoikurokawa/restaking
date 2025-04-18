use bytemuck::{Pod, Zeroable};
use jito_bytemuck::{types::PodU64, AccountDeserialize, Discriminator};
use jito_vault_sdk::error::VaultError;
use shank::ShankAccount;
use solana_program::{account_info::AccountInfo, msg, program_error::ProgramError, pubkey::Pubkey};

use crate::delegation_state::DelegationState;

const RESERVED_SPACE_LEN: usize = 263;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Pod, Zeroable, AccountDeserialize, ShankAccount)]
#[repr(C)]
pub struct VaultUpdateStateTracker {
    /// The vault associated with this update ticket
    pub vault: Pubkey,

    /// The NCN epoch for which the delegations are to be updated
    ncn_epoch: PodU64,

    /// The last updated index of the vault
    last_updated_index: PodU64,

    /// The total amount delegated across all the operators in the vault
    pub delegation_state: DelegationState,

    pub withdrawal_allocation_method: u8,

    reserved: [u8; 263],
}

impl VaultUpdateStateTracker {
    pub fn new(vault: Pubkey, ncn_epoch: u64, withdrawal_allocation_method: u8) -> Self {
        Self {
            vault,
            ncn_epoch: PodU64::from(ncn_epoch),
            last_updated_index: PodU64::from(u64::MAX),
            delegation_state: DelegationState::default(),
            withdrawal_allocation_method,
            reserved: [0; RESERVED_SPACE_LEN],
        }
    }

    pub fn ncn_epoch(&self) -> u64 {
        self.ncn_epoch.into()
    }

    pub fn last_updated_index(&self) -> u64 {
        self.last_updated_index.into()
    }

    /// Checks and updates the index of the vault update state tracker
    /// Index starts at different values depending on the NCN epoch to prevent
    /// any single operator from getting starved
    pub fn check_and_update_index(
        &mut self,
        index: u64,
        num_operators: u64,
    ) -> Result<(), VaultError> {
        if self.last_updated_index() == u64::MAX {
            let start_index = self
                .ncn_epoch()
                .checked_rem(num_operators)
                .ok_or(VaultError::DivisionByZero)?;
            if index != start_index {
                msg!("VaultUpdateStateTracker incorrect index");
                return Err(VaultError::VaultUpdateIncorrectIndex);
            }
        } else {
            let next_index = self
                .last_updated_index()
                .checked_add(1)
                .and_then(|i| i.checked_rem(num_operators))
                .ok_or(VaultError::ArithmeticOverflow)?;

            if index != next_index {
                msg!("VaultUpdateStateTracker incorrect index");
                return Err(VaultError::VaultUpdateIncorrectIndex);
            }
        }
        self.last_updated_index = PodU64::from(index);
        Ok(())
    }

    pub fn all_operators_updated(&self, num_operators: u64) -> Result<bool, VaultError> {
        if self.last_updated_index() == u64::MAX {
            return Ok(false);
        }

        let start_index = self
            .ncn_epoch()
            .checked_rem(num_operators)
            .ok_or(VaultError::DivisionByZero)?;

        if start_index == 0 {
            return Ok(self.last_updated_index()
                == num_operators
                    .checked_sub(1)
                    .ok_or(VaultError::ArithmeticUnderflow)?);
        }

        Ok(self.last_updated_index()
            == start_index
                .checked_sub(1)
                .ok_or(VaultError::ArithmeticUnderflow)?)
    }

    /// Returns the seeds for the PDA
    ///
    /// # Arguments
    /// * `vault` - The vault
    /// * `ncn_epoch` - The NCN epoch
    pub fn seeds(vault: &Pubkey, ncn_epoch: u64) -> Vec<Vec<u8>> {
        Vec::from_iter([
            b"vault_update_state_tracker".to_vec(),
            vault.to_bytes().to_vec(),
            ncn_epoch.to_le_bytes().to_vec(),
        ])
    }

    /// Find the program address for the PDA
    pub fn find_program_address(
        program_id: &Pubkey,
        vault: &Pubkey,
        ncn_epoch: u64,
    ) -> (Pubkey, u8, Vec<Vec<u8>>) {
        let seeds = Self::seeds(vault, ncn_epoch);
        let seeds_iter: Vec<_> = seeds.iter().map(|s| s.as_slice()).collect();
        let (pda, bump) = Pubkey::find_program_address(&seeds_iter, program_id);
        (pda, bump, seeds)
    }

    pub fn load(
        program_id: &Pubkey,
        vault_update_delegation_ticket: &AccountInfo,
        vault: &AccountInfo,
        ncn_epoch: u64,
        expect_writable: bool,
    ) -> Result<(), ProgramError> {
        if vault_update_delegation_ticket.owner.ne(program_id) {
            msg!("Vault update delegations ticket has an invalid owner");
            return Err(ProgramError::InvalidAccountOwner);
        }
        if vault_update_delegation_ticket.data_is_empty() {
            msg!("Vault update delegations ticket data is empty");
            return Err(ProgramError::InvalidAccountData);
        }
        if expect_writable && !vault_update_delegation_ticket.is_writable {
            msg!("Vault update delegations ticket is not writable");
            return Err(ProgramError::InvalidAccountData);
        }
        if vault_update_delegation_ticket.data.borrow()[0].ne(&Self::DISCRIMINATOR) {
            msg!("Vault update delegations ticket discriminator is invalid");
            return Err(ProgramError::InvalidAccountData);
        }
        let expected_pubkey = Self::find_program_address(program_id, vault.key, ncn_epoch).0;
        if vault_update_delegation_ticket.key.ne(&expected_pubkey) {
            msg!("Vault update delegations ticket is not at the correct PDA");
            return Err(ProgramError::InvalidAccountData);
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use jito_bytemuck::types::PodU64;
    use jito_vault_sdk::error::VaultError;
    use solana_program::pubkey::Pubkey;

    use crate::{
        delegation_state::DelegationState,
        vault_update_state_tracker::{VaultUpdateStateTracker, RESERVED_SPACE_LEN},
    };

    #[test]
    fn test_vault_update_state_tracker_no_padding() {
        let vault_update_state_tracker_size = std::mem::size_of::<VaultUpdateStateTracker>();
        let sum_of_fields = size_of::<Pubkey>() + // vault
            size_of::<PodU64>() + // ncn_epoch
            size_of::<PodU64>() + // last_updated_index
            size_of::<DelegationState>() + // delegation_state
            size_of::<u8>() + // withdrawal_allocation_method
            RESERVED_SPACE_LEN; // reserved
        assert_eq!(vault_update_state_tracker_size, sum_of_fields);
    }

    #[test]
    fn test_update_index_zero_ok() {
        let mut vault_update_state_tracker =
            VaultUpdateStateTracker::new(Pubkey::new_unique(), 0, 0);

        assert!(vault_update_state_tracker
            .check_and_update_index(0, 1)
            .is_ok());
    }

    #[test]
    fn test_update_index_skip_zero_fails() {
        let mut vault_update_state_tracker =
            VaultUpdateStateTracker::new(Pubkey::new_unique(), 0, 0);
        assert_eq!(
            vault_update_state_tracker.check_and_update_index(1, 2),
            Err(VaultError::VaultUpdateIncorrectIndex)
        );
    }

    #[test]
    fn test_update_index_skip_index_fails() {
        let mut vault_update_state_tracker =
            VaultUpdateStateTracker::new(Pubkey::new_unique(), 0, 0);
        let n = 4;
        vault_update_state_tracker
            .check_and_update_index(0, n)
            .unwrap();
        vault_update_state_tracker
            .check_and_update_index(1, n)
            .unwrap();
        assert_eq!(
            vault_update_state_tracker.check_and_update_index(3, n),
            Err(VaultError::VaultUpdateIncorrectIndex)
        );
    }

    #[test]
    fn test_update_index_wraparound() {
        let n = 4;
        // Epoch 6, offset is 6 % 4 = 2
        let mut vault_update_state_tracker =
            VaultUpdateStateTracker::new(Pubkey::new_unique(), 6, 0);

        assert_eq!(
            vault_update_state_tracker.check_and_update_index(0, n),
            Err(VaultError::VaultUpdateIncorrectIndex)
        );

        vault_update_state_tracker
            .check_and_update_index(2, n)
            .unwrap();
        assert_eq!(vault_update_state_tracker.last_updated_index(), 2);

        vault_update_state_tracker
            .check_and_update_index(3, n)
            .unwrap();

        vault_update_state_tracker
            .check_and_update_index(0, n)
            .unwrap();
        assert_eq!(vault_update_state_tracker.last_updated_index(), 0);

        vault_update_state_tracker
            .check_and_update_index(1, n)
            .unwrap();
        assert_eq!(vault_update_state_tracker.last_updated_index(), 1);

        assert!(vault_update_state_tracker.all_operators_updated(n).unwrap());
    }

    #[test]
    fn test_all_operators_updated() {
        let n = 4;

        // Cranking not started
        let mut tracker = VaultUpdateStateTracker::new(Pubkey::new_unique(), 0, 0);
        assert_eq!(tracker.all_operators_updated(n).unwrap(), false);

        // Middle of cranking
        tracker.last_updated_index = PodU64::from(1);
        assert_eq!(tracker.all_operators_updated(n).unwrap(), false);

        // All operators updated, start_index = 0
        tracker.last_updated_index = PodU64::from(3);
        assert_eq!(tracker.all_operators_updated(n).unwrap(), true);

        // start_index = operators - 1
        let mut tracker = VaultUpdateStateTracker::new(Pubkey::new_unique(), n - 1, 0);
        tracker.last_updated_index = PodU64::from(n - 2);
        assert_eq!(tracker.all_operators_updated(n).unwrap(), true);

        // start_index = operators, last_updated = start_index - 1
        let mut tracker = VaultUpdateStateTracker::new(Pubkey::new_unique(), n, 0);
        tracker.last_updated_index = PodU64::from(0);
        assert_eq!(tracker.all_operators_updated(n).unwrap(), false);

        // All operators updated, start_index != 0
        let mut tracker = VaultUpdateStateTracker::new(Pubkey::new_unique(), 1, 0);
        tracker.last_updated_index = PodU64::from(0);
        assert_eq!(tracker.all_operators_updated(n).unwrap(), true);

        // Single operator
        let mut tracker = VaultUpdateStateTracker::new(Pubkey::new_unique(), 2, 0);
        tracker.last_updated_index = PodU64::from(0);
        assert_eq!(tracker.all_operators_updated(1).unwrap(), true);

        // Error - division by zero
        let mut tracker = VaultUpdateStateTracker::new(Pubkey::new_unique(), 0, 0);
        tracker.last_updated_index = PodU64::from(0);
        assert_eq!(
            tracker.all_operators_updated(0),
            Err(VaultError::DivisionByZero)
        );
    }
}
