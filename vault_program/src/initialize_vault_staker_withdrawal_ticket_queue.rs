use jito_bytemuck::{AccountDeserialize, Discriminator};
use jito_jsm_core::{
    create_account,
    loader::{
        load_signer, load_system_account, load_system_program, load_token_mint, load_token_program,
    },
};
use jito_vault_core::{
    config::Config, vault::Vault,
    vault_staker_withdrawal_ticket_queue::VaultStakerWithdrawalTicketQueue,
};
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, msg, program_error::ProgramError,
    pubkey::Pubkey, rent::Rent, sysvar::Sysvar,
};

/// Processes the create instruction: [`crate::VaultInstruction::InitializeVault`]
#[inline(never)]
pub fn process_initialize_vault_staker_withdrawal_ticket_queue(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let [config, vault, vrt_mint, mint, admin, base, vault_staker_withdrawal_ticket_queue, vault_staker_withdrawal_ticket_queue_base, system_program, token_program] =
        accounts
    else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };
    Config::load(program_id, config, true)?;
    load_system_account(vault, true)?;
    load_system_account(vrt_mint, true)?;
    load_signer(vrt_mint, true)?;
    load_token_mint(mint)?;
    load_signer(admin, true)?;
    load_signer(base, false)?;
    load_system_program(system_program)?;
    load_token_program(token_program)?;

    // The vault account shall be at the canonical PDA
    let (vault_pubkey, vault_bump, mut vault_seeds) =
        Vault::find_program_address(program_id, base.key);
    vault_seeds.push(vec![vault_bump]);
    if vault.key.ne(&vault_pubkey) {
        msg!("Vault account is not at the correct PDA");
        return Err(ProgramError::InvalidAccountData);
    }

    // Initialize VaultOperatorQueue
    {
        msg!(
            "Initializing VaultStakerWithdrawalTicketQueue at address: {}",
            vault_staker_withdrawal_ticket_queue.key
        );
        create_account(
            admin,
            vault_staker_withdrawal_ticket_queue,
            system_program,
            program_id,
            &Rent::get()?,
            10240,
            &vault_seeds,
        )?;

        let mut queue_data = vault_staker_withdrawal_ticket_queue.try_borrow_mut_data()?;
        queue_data[0] = VaultStakerWithdrawalTicketQueue::DISCRIMINATOR;
        let queue =
            VaultStakerWithdrawalTicketQueue::try_from_slice_unchecked_mut(&mut queue_data)?;
        *queue =
            VaultStakerWithdrawalTicketQueue::new(*vault_staker_withdrawal_ticket_queue_base.key);
    }

    Ok(())
}
