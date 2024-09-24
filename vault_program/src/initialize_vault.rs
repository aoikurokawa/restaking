use std::mem::size_of;

use jito_bytemuck::{AccountDeserialize, Discriminator};
use jito_jsm_core::{
    create_account,
    loader::{
        load_signer, load_system_account, load_system_program, load_token_mint, load_token_program,
    },
};
use jito_vault_core::{
    config::Config, vault::Vault,
    vault_staker_withdrawal_ticket_expired_queue::VaultStakerWithdrawalTicketExpiredQueue,
    vault_staker_withdrawal_ticket_queue::VaultStakerWithdrawalTicketQueue, MAX_FEE_BPS,
};
use jito_vault_sdk::error::VaultError;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, msg, program::invoke,
    program_error::ProgramError, program_pack::Pack, pubkey::Pubkey, rent::Rent,
    system_instruction, sysvar::Sysvar,
};
use spl_token::state::Mint;

/// Processes the create instruction: [`crate::VaultInstruction::InitializeVault`]
pub fn process_initialize_vault(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    deposit_fee_bps: u16,
    withdrawal_fee_bps: u16,
    reward_fee_bps: u16,
    decimals: u8,
) -> ProgramResult {
    let [config, vault, vrt_mint, mint, admin, base, withdrawal_queue_info, withdrawal_queue_base, expired_queue_info, expired_queue_base, system_program, token_program] =
        accounts
    else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };
    Config::load(program_id, config, true)?;
    let mut config_data = config.data.borrow_mut();
    let config = Config::try_from_slice_unchecked_mut(&mut config_data)?;

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

    if deposit_fee_bps > config.deposit_withdrawal_fee_cap_bps()
        || withdrawal_fee_bps > config.deposit_withdrawal_fee_cap_bps()
        || reward_fee_bps > MAX_FEE_BPS
    {
        msg!(
            "Fee cap exceeds maximum allowed of {}",
            config.deposit_withdrawal_fee_cap_bps()
        );
        return Err(VaultError::VaultFeeCapExceeded.into());
    }

    let rent = Rent::get()?;

    // Initialize VRT mint
    {
        msg!("Initializing mint @ address {}", vrt_mint.key);
        invoke(
            &system_instruction::create_account(
                admin.key,
                vrt_mint.key,
                rent.minimum_balance(Mint::get_packed_len()),
                Mint::get_packed_len() as u64,
                token_program.key,
            ),
            &[admin.clone(), vrt_mint.clone(), system_program.clone()],
        )?;

        invoke(
            &spl_token::instruction::initialize_mint2(
                &spl_token::id(),
                vrt_mint.key,
                vault.key,
                None,
                decimals,
            )?,
            &[vrt_mint.clone()],
        )?;
    }

    // Initialize vault
    {
        msg!("Initializing vault at address {}", vault.key);
        create_account(
            admin,
            vault,
            system_program,
            program_id,
            &Rent::get()?,
            8_u64.checked_add(size_of::<Vault>() as u64).unwrap(),
            &vault_seeds,
        )?;

        let mut vault_data = vault.try_borrow_mut_data()?;
        vault_data[0] = Vault::DISCRIMINATOR;
        let vault = Vault::try_from_slice_unchecked_mut(&mut vault_data)?;

        *vault = Vault::new(
            *vrt_mint.key,
            *mint.key,
            *admin.key,
            config.num_vaults(),
            *base.key,
            deposit_fee_bps,
            withdrawal_fee_bps,
            reward_fee_bps,
            vault_bump,
        );
    }

    let (_, queue_bump, mut queue_seeds) = VaultStakerWithdrawalTicketQueue::find_program_address(
        program_id,
        vault.key,
        withdrawal_queue_base.key,
    );
    queue_seeds.push(vec![queue_bump]);

    // Initialize VaultStakerWithdrawalTicketQueue
    {
        msg!(
            "Initializing vault staker withdrawal ticket queue at address {}",
            withdrawal_queue_info.key
        );
        create_account(
            admin,
            withdrawal_queue_info,
            system_program,
            program_id,
            &Rent::get()?,
            8_u64
                .checked_add(size_of::<VaultStakerWithdrawalTicketQueue>() as u64)
                .unwrap(),
            &queue_seeds,
        )?;

        let mut queue_data = withdrawal_queue_info.try_borrow_mut_data()?;
        queue_data[0] = VaultStakerWithdrawalTicketQueue::DISCRIMINATOR;
    }

    let (_, expired_queue_bump, mut expired_queue_seeds) =
        VaultStakerWithdrawalTicketExpiredQueue::find_program_address(
            program_id,
            vault.key,
            expired_queue_base.key,
        );
    expired_queue_seeds.push(vec![expired_queue_bump]);

    // Initialize VaultStakerWithdrawalTicketExpiredQueue
    {
        msg!(
            "Initializing vault staker withdrawal ticket expired queue at address {}",
            expired_queue_info.key
        );
        create_account(
            admin,
            expired_queue_info,
            system_program,
            program_id,
            &Rent::get()?,
            8_u64
                .checked_add(size_of::<VaultStakerWithdrawalTicketExpiredQueue>() as u64)
                .unwrap(),
            &expired_queue_seeds,
        )?;

        let mut queue_data = expired_queue_info.try_borrow_mut_data()?;
        queue_data[0] = VaultStakerWithdrawalTicketExpiredQueue::DISCRIMINATOR;
    }

    config.increment_num_vaults()?;

    Ok(())
}
