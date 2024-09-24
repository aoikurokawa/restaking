use bytemuck::{Pod, Zeroable};
use jito_bytemuck::{types::PodU16, AccountDeserialize, Discriminator};
use shank::ShankAccount;
use solana_program::{account_info::AccountInfo, msg, program_error::ProgramError, pubkey::Pubkey};

impl Discriminator for VaultStakerWithdrawalTicketExpiredQueue {
    const DISCRIMINATOR: u8 = 11;
}

/// The vault is responsible for holding tokens and minting VRT tokens
/// based on the amount of tokens deposited.
/// It also contains several administrative functions for features inside the vault.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Pod, Zeroable, AccountDeserialize, ShankAccount)]
#[repr(C)]
pub struct VaultStakerWithdrawalTicketExpiredQueue {
    /// The base account used as a PDA seed
    pub base: Pubkey,

    head: PodU16,

    len: PodU16,

    /// The vault being withdrawn from
    pub tickets: [Pubkey; 317],
}

impl VaultStakerWithdrawalTicketExpiredQueue {
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

    pub fn first(&self) -> Option<&Pubkey> {
        if self.len() == 0 {
            return None;
        }

        Some(&self.tickets[self.head() as usize])
    }

    /// Adds an entry to the back of the queue (push_back)
    pub fn push_back(&mut self, entry: Pubkey) {
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
    pub fn pop_front(&mut self) -> Option<Pubkey> {
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
    fn seeds(vault: &Pubkey, base: &Pubkey) -> Vec<Vec<u8>> {
        Vec::from_iter([
            b"ticket_expired_queue".to_vec(),
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
            msg!("VaultStakerWithdrawalTicketExpiredQueue account has an invalid owner");
            return Err(ProgramError::InvalidAccountOwner);
        }
        if account.data_is_empty() {
            msg!("VaultStakerWithdrawalTicketExpiredQueue account data is empty");
            return Err(ProgramError::InvalidAccountData);
        }
        if expect_writable && !account.is_writable {
            msg!("VaultStakerWithdrawalTicketExpiredQueue account is not writable");
            return Err(ProgramError::InvalidAccountData);
        }
        if account.data.borrow()[0].ne(&Self::DISCRIMINATOR) {
            msg!("VaultStakerWithdrawalTicketExpiredQueue account discriminator is invalid");
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
