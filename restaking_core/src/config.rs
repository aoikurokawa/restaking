use bytemuck::{Pod, Zeroable};
use jito_account_traits::{AccountDeserialize, Discriminator};
use solana_program::{clock::DEFAULT_SLOTS_PER_EPOCH, pubkey::Pubkey};

impl Discriminator for Config {
    const DISCRIMINATOR: u8 = 1;
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Pod, Zeroable, AccountDeserialize)]
#[repr(C)]
pub struct Config {
    /// The configuration admin
    pub admin: Pubkey,

    /// The vault program
    pub vault_program: Pubkey,

    /// The number of NCN managed by the program
    pub ncn_count: u64,

    /// The number of operators managed by the program
    pub operator_count: u64,

    /// The length of an epoch in slots
    pub epoch_length: u64,

    /// The bump seed for the PDA
    pub bump: u8,

    /// Reserved space
    reserved_1: [u8; 7],
}

impl Config {
    pub const fn new(admin: Pubkey, vault_program: Pubkey, bump: u8) -> Self {
        Self {
            admin,
            vault_program,
            epoch_length: DEFAULT_SLOTS_PER_EPOCH,
            ncn_count: 0,
            operator_count: 0,
            bump,
            reserved_1: [0; 7],
        }
    }

    pub fn seeds() -> Vec<Vec<u8>> {
        vec![b"config".to_vec()]
    }

    pub fn find_program_address(program_id: &Pubkey) -> (Pubkey, u8, Vec<Vec<u8>>) {
        let seeds = Self::seeds();
        let seeds_iter: Vec<_> = seeds.iter().map(|s| s.as_slice()).collect();
        let (pda, bump) = Pubkey::find_program_address(&seeds_iter, program_id);
        (pda, bump, seeds)
    }
}
