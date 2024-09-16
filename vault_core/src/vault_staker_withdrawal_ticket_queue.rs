use bytemuck::{Pod, Zeroable};
use jito_bytemuck::{
    types::{PodU16, PodU64},
    AccountDeserialize, Discriminator,
};
use shank::{ShankAccount, ShankType};
use solana_program::{account_info::AccountInfo, msg, program_error::ProgramError, pubkey::Pubkey};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Pod, Zeroable, ShankType)]
#[repr(C)]
pub struct VaultStakerWithdrawalTicketEntry {
    /// The vault being withdrawn from
    pub ticket: Pubkey,

    /// The slot the withdrawal was enqueued
    pub expired_at: PodU64,
}

impl VaultStakerWithdrawalTicketEntry {
    pub fn new(ticket: Pubkey, expired_at: u64) -> Self {
        Self {
            ticket,
            expired_at: PodU64::from(expired_at),
        }
    }

    pub fn expired_at(&self) -> u64 {
        self.expired_at.into()
    }
}

impl Default for VaultStakerWithdrawalTicketEntry {
    fn default() -> Self {
        Self {
            ticket: Pubkey::new_unique(),
            expired_at: PodU64::from(0),
        }
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

    pub head: PodU16,

    pub len: PodU16,

    /// The vault being withdrawn from
    pub tickets: [VaultStakerWithdrawalTicketEntry; 10],
}

impl VaultStakerWithdrawalTicketQueue {
    /// Initialize a new, empty queue
    pub fn new(base: Pubkey) -> Self {
        Self {
            base,
            head: PodU16::from(0),
            len: PodU16::from(0),
            tickets: [VaultStakerWithdrawalTicketEntry::default(); 10],
        }
    }

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
        if self.len() == 0 {
            return None;
        }

        Some(&self.tickets[self.head() as usize])
    }

    /// Adds an entry to the back of the queue (push_back)
    pub fn push_back(&mut self, entry: VaultStakerWithdrawalTicketEntry) {
        if self.len() < self.tickets.len() as u16 {
            let idx = (self.head() + self.len()) as usize % self.tickets.len();
            self.tickets[idx] = entry;
            self.len = PodU16::from(self.len() + 1);
        } else {
            self.head = PodU16::from((self.head() + 1) % self.tickets.len() as u16);
            let idx = (self.head() + self.len() - 1) as usize % self.tickets.len();
            self.tickets[idx] = entry;
        }
    }

    /// Removes the front element and move the haad forward
    pub fn pop_front(&mut self) -> Option<VaultStakerWithdrawalTicketEntry> {
        if self.len() == 0 {
            return None;
        }

        let entry = self.tickets[self.head() as usize];
        self.head = PodU16::from((self.head() + 1) % self.tickets.len() as u16);
        self.len = PodU16::from(self.len() - 1);

        Some(entry)
    }

    /// Returns the seeds for the PDA
    ///
    /// # Arguments
    /// * `vault` - The vault
    /// * `ncn_epoch` - The NCN epoch
    pub fn seeds(vault: &Pubkey, base: &Pubkey) -> Vec<Vec<u8>> {
        Vec::from_iter([
            b"vault_staker_withdrawal_ticket_queue".to_vec(),
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
