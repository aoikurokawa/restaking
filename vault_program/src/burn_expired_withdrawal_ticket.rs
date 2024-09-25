use jito_bytemuck::AccountDeserialize;
use jito_jsm_core::{
    close_program_account,
    loader::{load_associated_token_account, load_system_program, load_token_program},
};
use jito_vault_core::{
    config::Config, vault::Vault, vault_staker_withdrawal_ticket::VaultStakerWithdrawalTicket,
    vault_staker_withdrawal_ticket_expired_queue::VaultStakerWithdrawalTicketExpiredQueue,
};
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, program::invoke_signed,
    program_error::ProgramError, pubkey::Pubkey,
};
use spl_token::instruction::{close_account, transfer};

/// Burns the withdrawal ticket, transferring the assets to the staker and closing the withdrawal ticket.
///
/// One should call the [`crate::VaultInstruction::CrankVaultUpdateStateTracker`] instruction before running this instruction
/// to ensure that any rewards that were accrued are accounted for.
pub fn process_burn_expired_withdrawal_ticket(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let (required_accounts, optional_accounts) = accounts.split_at(9);

    let [config, vault_info, vault_staker_withdrawal_ticket_info, vault_staker_withdrawal_ticket_token_account, staker, staker_vrt_token_account, expired_queue_info, token_program, system_program] =
        required_accounts
    else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };

    Config::load(program_id, config, false)?;
    let config_data = config.data.borrow();
    let _config = Config::try_from_slice_unchecked(&config_data)?;
    Vault::load(program_id, vault_info, true)?;
    let mut vault_data = vault_info.data.borrow_mut();
    let vault = Vault::try_from_slice_unchecked_mut(&mut vault_data)?;
    VaultStakerWithdrawalTicket::load(
        program_id,
        vault_staker_withdrawal_ticket_info,
        vault_info,
        false,
    )?;
    let vault_staker_withdrawal_ticket_data = vault_staker_withdrawal_ticket_info.data.borrow();
    let vault_staker_withdrawal_ticket = VaultStakerWithdrawalTicket::try_from_slice_unchecked(
        &vault_staker_withdrawal_ticket_data,
    )?;
    load_associated_token_account(
        vault_staker_withdrawal_ticket_token_account,
        vault_staker_withdrawal_ticket_info.key,
        &vault.vrt_mint,
    )?;
    load_associated_token_account(staker_vrt_token_account, staker.key, &vault.vrt_mint)?;
    VaultStakerWithdrawalTicketExpiredQueue::load(program_id, expired_queue_info, true)?;
    let mut expired_queue_data = expired_queue_info.data.borrow_mut();
    let expired_queue = VaultStakerWithdrawalTicketExpiredQueue::try_from_slice_unchecked_mut(
        &mut expired_queue_data,
    )?;
    load_token_program(token_program)?;
    load_system_program(system_program)?;

    vault.check_mint_burn_admin(optional_accounts.first())?;

    if let Ok(Some(_first_ticket)) = expired_queue.pop_front() {
        let (_, vault_staker_withdraw_bump, mut vault_staker_withdraw_seeds) =
            VaultStakerWithdrawalTicket::find_program_address(
                program_id,
                vault_info.key,
                &vault_staker_withdrawal_ticket.base,
            );
        vault_staker_withdraw_seeds.push(vec![vault_staker_withdraw_bump]);
        let seed_slices: Vec<&[u8]> = vault_staker_withdraw_seeds
            .iter()
            .map(|seed| seed.as_slice())
            .collect();

        let amount = vault_staker_withdrawal_ticket.vrt_amount();
        drop(vault_staker_withdrawal_ticket_data);

        // transfer the assets to the staker
        invoke_signed(
            &transfer(
                &spl_token::id(),
                vault_staker_withdrawal_ticket_token_account.key,
                staker_vrt_token_account.key,
                vault_staker_withdrawal_ticket_info.key,
                &[],
                amount,
            )?,
            &[
                vault_staker_withdrawal_ticket_token_account.clone(),
                staker_vrt_token_account.clone(),
                vault_staker_withdrawal_ticket_info.clone(),
            ],
            &[&seed_slices],
        )?;

        // close token account
        invoke_signed(
            &close_account(
                &spl_token::id(),
                vault_staker_withdrawal_ticket_token_account.key,
                staker.key,
                vault_staker_withdrawal_ticket_info.key,
                &[],
            )?,
            &[
                vault_staker_withdrawal_ticket_token_account.clone(),
                staker.clone(),
                vault_staker_withdrawal_ticket_info.clone(),
            ],
            &[&seed_slices],
        )?;
        close_program_account(program_id, vault_staker_withdrawal_ticket_info, staker)?;

        vault.decrement_vrt_ready_to_claim_amount(amount)?;
    }

    Ok(())
}
