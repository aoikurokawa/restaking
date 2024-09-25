use bytemuck::{Pod, Zeroable};
use jito_bytemuck::{
    types::{PodU16, PodU64},
    AccountDeserialize, Discriminator,
};
use jito_vault_sdk::error::VaultError;
use shank::{ShankAccount, ShankType};
use solana_program::{account_info::AccountInfo, msg, program_error::ProgramError, pubkey::Pubkey};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Pod, Zeroable, ShankType)]
#[repr(C)]
pub struct VaultStakerWithdrawalTicketEntry {
    pub ticket: Pubkey,

    pub staker: Pubkey,

    pub expired_at: PodU64,
}

impl VaultStakerWithdrawalTicketEntry {
    pub fn new(ticket: Pubkey, staker: Pubkey, expired_at: u64) -> Self {
        Self {
            ticket,
            staker,
            expired_at: PodU64::from(expired_at),
        }
    }

    pub fn expired_at(&self) -> u64 {
        self.expired_at.into()
    }
}

impl Discriminator for VaultStakerWithdrawalTicketQueue {
    const DISCRIMINATOR: u8 = 10;
}

/// The vault is responsible for holding tokens and minting VRT tokens
/// based on the amount of tokens deposited.
/// It also contains several administrative functions for features inside the vault.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Pod, Zeroable, AccountDeserialize, ShankAccount)]
#[repr(C)]
pub struct VaultStakerWithdrawalTicketQueue {
    /// The base account used as a PDA seed
    pub base: Pubkey,

    head: PodU16,

    len: PodU16,

    /// The vault being withdrawn from
    pub tickets: [VaultStakerWithdrawalTicketEntry; 140],
}

impl VaultStakerWithdrawalTicketQueue {
    pub fn head(&self) -> u16 {
        self.head.into()
    }

    /// Returns the current size of the queue
    pub fn len(&self) -> u16 {
        self.len.into()
    }

    /// Check if the queue is empty
    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }

    pub fn first(&self) -> Option<&VaultStakerWithdrawalTicketEntry> {
        if self.is_empty() {
            return None;
        }

        Some(&self.tickets[self.head() as usize])
    }

    /// Adds an entry to the back of the queue (push_back)
    pub fn push_back(&mut self, entry: VaultStakerWithdrawalTicketEntry) -> Result<(), VaultError> {
        if self.len() < self.tickets.len() as u16 {
            let idx = self
                .head()
                .checked_add(self.len())
                .and_then(|val| val.checked_rem(self.tickets.len() as u16))
                .ok_or(VaultError::VaultUnderflow)?;
            self.tickets[idx as usize] = entry;
            self.len = PodU16::from(self.len().checked_add(1).ok_or(VaultError::VaultOverflow)?);
        } else {
            self.head = PodU16::from(
                self.head()
                    .checked_add(1)
                    .and_then(|val| val.checked_rem(self.tickets.len() as u16))
                    .ok_or(VaultError::VaultUnderflow)?,
            );
            let idx = self
                .head()
                .checked_add(self.len())
                .and_then(|val| val.checked_sub(1))
                .and_then(|val| val.checked_rem(self.tickets.len() as u16))
                .ok_or(VaultError::VaultUnderflow)?;
            self.tickets[idx as usize] = entry;
        }

        Ok(())
    }

    /// Removes the front element and move the haad forward
    pub fn pop_front(&mut self) -> Result<Option<VaultStakerWithdrawalTicketEntry>, VaultError> {
        if self.is_empty() {
            return Ok(None);
        }

        let entry = self.tickets[self.head() as usize];

        self.head = PodU16::from(
            self.head()
                .checked_add(1)
                .and_then(|val| val.checked_rem(self.tickets.len() as u16))
                .ok_or(VaultError::VaultUnderflow)?,
        );
        self.len = PodU16::from(
            self.len()
                .checked_sub(1)
                .ok_or(VaultError::VaultUnderflow)?,
        );

        Ok(Some(entry))
    }

    /// Returns the seeds for the PDA
    ///
    /// # Arguments
    /// * `vault` - The vault
    fn seeds(vault: &Pubkey, base: &Pubkey) -> Vec<Vec<u8>> {
        Vec::from_iter([
            b"ticket_queue".to_vec(),
            vault.to_bytes().to_vec(),
            base.to_bytes().to_vec(),
        ])
    }

    /// Find the program address for the [`VaultStakerWithdrawalTicketQueue`]
    ///
    /// # Arguments
    /// * `program_id` - The program ID
    /// * `base` - The base account used as a PDA seed
    ///
    /// # Returns
    /// * [`Pubkey`] - The program address
    /// * `u8` - The bump seed
    /// * `Vec<Vec<u8>>` - The seeds used to generate the PDA
    pub fn find_program_address(
        program_id: &Pubkey,
        vault: &Pubkey,
        base: &Pubkey,
    ) -> (Pubkey, u8, Vec<Vec<u8>>) {
        let seeds = Self::seeds(vault, base);
        let seeds_iter: Vec<_> = seeds.iter().map(|s| s.as_slice()).collect();
        let (pda, bump) = Pubkey::find_program_address(&seeds_iter, program_id);
        (pda, bump, seeds)
    }

    /// Loads the [`VaultStakerWithdrawalTicketQueue`] account
    ///
    /// # Arguments
    /// * `program_id` - The program ID
    /// * `account` - The account to load
    /// * `expect_writable` - Whether the account should be writable
    ///
    /// # Returns
    /// * `Result<(), ProgramError>` - The result of the operation
    pub fn load(
        program_id: &Pubkey,
        account: &AccountInfo,
        expect_writable: bool,
    ) -> Result<(), ProgramError> {
        if account.owner.ne(program_id) {
            msg!("VaultStakerWithdrawalTicketQueue account has an invalid owner");
            return Err(ProgramError::InvalidAccountOwner);
        }
        if account.data_is_empty() {
            msg!("VaultStakerWithdrawalTicketQueue account data is empty");
            return Err(ProgramError::InvalidAccountData);
        }
        if expect_writable && !account.is_writable {
            msg!("VaultStakerWithdrawalTicketQueue account is not writable");
            return Err(ProgramError::InvalidAccountData);
        }
        if account.data.borrow()[0].ne(&Self::DISCRIMINATOR) {
            msg!("Vault account discriminator is invalid");
            return Err(ProgramError::InvalidAccountData);
        }
        // let base = Self::try_from_slice_unchecked(&account.data.borrow())?.base;
        // if account
        //     .key
        //     .ne(&Self::find_program_address(program_id, &base).0)
        // {
        //     msg!("Vault account is not at the correct PDA");
        //     return Err(ProgramError::InvalidAccountData);
        // }
        Ok(())
    }
}
