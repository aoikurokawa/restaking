use jito_account_traits::AccountDeserialize;
use jito_jsm_core::loader::load_signer;
use jito_restaking_core::ncn::Ncn;
use jito_vault_core::{config::Config, vault::Vault, vault_ncn_ticket::VaultNcnTicket};
use jito_vault_sdk::error::VaultError;
use solana_program::{
    account_info::AccountInfo, clock::Clock, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey, sysvar::Sysvar,
};

/// Remove a vault from the vault's NCN list.
///
/// # Behavior:
/// * The vault admin shall have the ability to remove support for a previously supported vault
///   at any time, independent of whether the NCN still supports the vault or not.
///
/// Instruction: [`crate::VaultInstruction::CooldownVaultNcnTicket`]
pub fn process_cooldown_vault_ncn_ticket(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let [config, vault, ncn, vault_ncn_ticket, vault_ncn_admin] = accounts else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };

    Config::load(program_id, config, false)?;
    Vault::load(program_id, vault, false)?;
    let config_data = config.data.borrow();
    let config = Config::try_from_slice_unchecked(&config_data)?;
    Ncn::load(&config.restaking_program, ncn, false)?;
    VaultNcnTicket::load(program_id, vault_ncn_ticket, ncn, vault, true)?;
    load_signer(vault_ncn_admin, false)?;

    // The Vault NCN admin shall be the signer of the transaction
    let vault_data = vault.data.borrow();
    let vault = Vault::try_from_slice_unchecked(&vault_data)?;
    if vault.ncn_admin.ne(vault_ncn_admin.key) {
        msg!("Invalid NCN admin for vault");
        return Err(VaultError::VaultNcnAdminInvalid.into());
    }

    // The vault shall be up-to-date before removing support for the NCN
    if vault.is_update_needed(Clock::get()?.slot, config.epoch_length) {
        msg!("Vault update is needed");
        return Err(VaultError::VaultUpdateNeeded.into());
    }

    // The VaultNcnTicket must be active in order to cooldown the NCN
    let mut vault_ncn_ticket_data = vault_ncn_ticket.data.borrow_mut();
    let vault_ncn_ticket =
        VaultNcnTicket::try_from_slice_unchecked_mut(&mut vault_ncn_ticket_data)?;
    if !vault_ncn_ticket
        .state
        .deactivate(Clock::get()?.slot, config.epoch_length)
    {
        msg!("NCN is not ready to be deactivated");
        return Err(VaultError::VaultNcnTicketFailedCooldown.into());
    }

    Ok(())
}
