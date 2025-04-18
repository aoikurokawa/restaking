mod add_delegation;
mod burn_withdrawal_ticket;
mod change_withdrawal_ticket_owner;
mod close_update_state_tracker;
mod cooldown_delegation;
mod cooldown_vault_ncn_slasher_ticket;
mod cooldown_vault_ncn_ticket;
mod crank_vault_update_state_tracker;
mod create_token_metadata;
mod delegate_token_account;
mod enqueue_withdrawal;
mod initialize_config;
mod initialize_vault;
mod initialize_vault_ncn_slasher_operator_ticket;
mod initialize_vault_ncn_slasher_ticket;
mod initialize_vault_ncn_ticket;
mod initialize_vault_operator_delegation;
mod initialize_vault_update_state_tracker;
mod initialize_vault_with_mint;
mod mint_to;
mod set_admin;
mod set_capacity;
mod set_config_admin;
mod set_fees;
mod set_is_paused;
mod set_program_fee;
mod set_program_fee_wallet;
mod set_secondary_admin;
mod update_token_metadata;
mod update_vault_balance;
mod warmup_vault_ncn_slasher_ticket;
mod warmup_vault_ncn_ticket;

use borsh::BorshDeserialize;
use jito_vault_sdk::instruction::VaultInstruction;
use set_program_fee::process_set_program_fee;
use solana_program::{
    account_info::AccountInfo, declare_id, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};
#[cfg(not(feature = "no-entrypoint"))]
use solana_security_txt::security_txt;

use crate::{
    add_delegation::process_add_delegation, burn_withdrawal_ticket::process_burn_withdrawal_ticket,
    change_withdrawal_ticket_owner::process_change_withdrawal_ticket_owner,
    close_update_state_tracker::process_close_vault_update_state_tracker,
    cooldown_delegation::process_cooldown_delegation,
    cooldown_vault_ncn_slasher_ticket::process_cooldown_vault_ncn_slasher_ticket,
    cooldown_vault_ncn_ticket::process_cooldown_vault_ncn_ticket,
    crank_vault_update_state_tracker::process_crank_vault_update_state_tracker,
    create_token_metadata::process_create_token_metadata,
    delegate_token_account::process_delegate_token_account,
    enqueue_withdrawal::process_enqueue_withdrawal, initialize_config::process_initialize_config,
    initialize_vault::process_initialize_vault,
    initialize_vault_ncn_slasher_operator_ticket::process_initialize_vault_ncn_slasher_operator_ticket,
    initialize_vault_ncn_slasher_ticket::process_initialize_vault_ncn_slasher_ticket,
    initialize_vault_ncn_ticket::process_initialize_vault_ncn_ticket,
    initialize_vault_operator_delegation::process_initialize_vault_operator_delegation,
    initialize_vault_update_state_tracker::process_initialize_vault_update_state_tracker,
    initialize_vault_with_mint::process_initialize_vault_with_mint, mint_to::process_mint,
    set_admin::process_set_admin, set_capacity::process_set_deposit_capacity,
    set_config_admin::process_set_config_admin, set_fees::process_set_fees,
    set_is_paused::process_set_is_paused, set_program_fee_wallet::process_set_program_fee_wallet,
    set_secondary_admin::process_set_secondary_admin,
    update_token_metadata::process_update_token_metadata,
    update_vault_balance::process_update_vault_balance,
    warmup_vault_ncn_slasher_ticket::process_warmup_vault_ncn_slasher_ticket,
    warmup_vault_ncn_ticket::process_warmup_vault_ncn_ticket,
};

declare_id!(env!("VAULT_PROGRAM_ID"));

#[cfg(not(feature = "no-entrypoint"))]
security_txt! {
    // Required fields
    name: "Jito's Liquid Restaking Program",
    project_url: "https://jito.network/",
    contacts: "email:team@jito.network",
    policy: "https://github.com/jito-foundation/restaking",
    // Optional Fields
    preferred_languages: "en",
    source_code: "https://github.com/jito-foundation/restaking"
}

#[cfg(not(feature = "no-entrypoint"))]
solana_program::entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    if *program_id != id() {
        return Err(ProgramError::IncorrectProgramId);
    }

    let instruction = VaultInstruction::try_from_slice(instruction_data)?;

    match instruction {
        // ------------------------------------------
        // Initialization
        // ------------------------------------------
        VaultInstruction::InitializeConfig { program_fee_bps } => {
            msg!("Instruction: InitializeConfig");
            process_initialize_config(program_id, accounts, program_fee_bps)
        }
        VaultInstruction::InitializeVault {
            deposit_fee_bps,
            withdrawal_fee_bps,
            reward_fee_bps,
            decimals,
            initialize_token_amount,
        } => {
            msg!("Instruction: InitializeVault");
            process_initialize_vault(
                program_id,
                accounts,
                deposit_fee_bps,
                withdrawal_fee_bps,
                reward_fee_bps,
                decimals,
                initialize_token_amount,
            )
        }
        VaultInstruction::InitializeVaultWithMint => {
            msg!("Instruction: InitializeVaultWithMint");
            process_initialize_vault_with_mint(program_id, accounts)
        }
        VaultInstruction::InitializeVaultNcnTicket => {
            msg!("Instruction: InitializeVaultNcnTicket");
            process_initialize_vault_ncn_ticket(program_id, accounts)
        }
        VaultInstruction::InitializeVaultOperatorDelegation => {
            msg!("Instruction: InitializeVaultOperatorDelegation");
            process_initialize_vault_operator_delegation(program_id, accounts)
        }
        VaultInstruction::InitializeVaultNcnSlasherTicket => {
            msg!("Instruction: InitializeVaultNcnSlasherTicket");
            process_initialize_vault_ncn_slasher_ticket(program_id, accounts)
        }
        VaultInstruction::InitializeVaultNcnSlasherOperatorTicket => {
            msg!("Instruction: InitializeVaultNcnSlasherOperatorTicket");
            process_initialize_vault_ncn_slasher_operator_ticket(program_id, accounts)
        }
        // ------------------------------------------
        // Vault administration
        // ------------------------------------------
        VaultInstruction::SetSecondaryAdmin(role) => {
            msg!("Instruction: SetDelegationAdmin");
            process_set_secondary_admin(program_id, accounts, role)
        }
        VaultInstruction::SetAdmin => {
            msg!("Instruction: SetAdmin");
            process_set_admin(program_id, accounts)
        }
        VaultInstruction::SetDepositCapacity { amount } => {
            msg!("Instruction: SetDepositCapacity");
            process_set_deposit_capacity(program_id, accounts, amount)
        }
        VaultInstruction::DelegateTokenAccount => {
            msg!("Instruction: DelegateTokenAccount");
            process_delegate_token_account(program_id, accounts)
        }
        VaultInstruction::SetFees {
            deposit_fee_bps,
            withdrawal_fee_bps,
            reward_fee_bps,
        } => {
            msg!("Instruction: SetFees");
            process_set_fees(
                program_id,
                accounts,
                deposit_fee_bps,
                withdrawal_fee_bps,
                reward_fee_bps,
            )
        }
        VaultInstruction::SetProgramFee { new_fee_bps } => {
            msg!("Instruction: SetProgramFee");
            process_set_program_fee(program_id, accounts, new_fee_bps)
        }
        VaultInstruction::SetProgramFeeWallet => {
            msg!("Instruction: SetProgramFeeWallet");
            process_set_program_fee_wallet(program_id, accounts)
        }
        VaultInstruction::SetIsPaused { is_paused } => {
            msg!("Instruction: SetIsPaused");
            process_set_is_paused(program_id, accounts, is_paused)
        }
        // ------------------------------------------
        // Vault minting and burning
        // ------------------------------------------
        VaultInstruction::MintTo {
            amount_in,
            min_amount_out,
        } => {
            msg!("Instruction: MintTo");
            process_mint(program_id, accounts, amount_in, min_amount_out)
        }
        VaultInstruction::EnqueueWithdrawal { amount } => {
            msg!("Instruction: EnqueueWithdrawal");
            process_enqueue_withdrawal(program_id, accounts, amount)
        }
        VaultInstruction::ChangeWithdrawalTicketOwner => {
            msg!("Instruction: ChangeWithdrawalTicketOwner");
            process_change_withdrawal_ticket_owner(program_id, accounts)
        }
        VaultInstruction::BurnWithdrawalTicket => {
            msg!("Instruction: BurnWithdrawalTicket");
            process_burn_withdrawal_ticket(program_id, accounts)
        }
        // ------------------------------------------
        // Vault-NCN operations
        // ------------------------------------------
        VaultInstruction::WarmupVaultNcnTicket => {
            msg!("Instruction: WarmupVaultNcnTicket");
            process_warmup_vault_ncn_ticket(program_id, accounts)
        }
        VaultInstruction::CooldownVaultNcnTicket => {
            msg!("Instruction: CooldownVaultNcnTicket");
            process_cooldown_vault_ncn_ticket(program_id, accounts)
        }
        // ------------------------------------------
        // Vault NCN slasher operations
        // ------------------------------------------
        VaultInstruction::WarmupVaultNcnSlasherTicket => {
            msg!("Instruction: WarmupVaultNcnSlasherTicket");
            process_warmup_vault_ncn_slasher_ticket(program_id, accounts)
        }
        VaultInstruction::CooldownVaultNcnSlasherTicket => {
            msg!("Instruction: CooldownVaultNcnSlasherTicket");
            process_cooldown_vault_ncn_slasher_ticket(program_id, accounts)
        }
        // ------------------------------------------
        // Vault delegation
        // ------------------------------------------
        VaultInstruction::AddDelegation { amount } => {
            msg!("Instruction: AddDelegation");
            process_add_delegation(program_id, accounts, amount)
        }
        VaultInstruction::CooldownDelegation { amount } => {
            msg!("Instruction: CooldownDelegation");
            process_cooldown_delegation(program_id, accounts, amount)
        }
        VaultInstruction::UpdateVaultBalance => {
            msg!("Instruction: UpdateVaultBalance");
            process_update_vault_balance(program_id, accounts)
        }
        VaultInstruction::InitializeVaultUpdateStateTracker {
            withdrawal_allocation_method,
        } => {
            msg!("Instruction: InitializeVaultUpdateStateTracker");
            process_initialize_vault_update_state_tracker(
                program_id,
                accounts,
                withdrawal_allocation_method,
            )
        }
        VaultInstruction::CrankVaultUpdateStateTracker => {
            msg!("Instruction: CrankVaultUpdateStateTracker");
            process_crank_vault_update_state_tracker(program_id, accounts)
        }
        VaultInstruction::CloseVaultUpdateStateTracker { ncn_epoch } => {
            msg!("Instruction: CloseVaultUpdateStateTracker");
            process_close_vault_update_state_tracker(program_id, accounts, ncn_epoch)
        }
        // ------------------------------------------
        // VRT metadata
        // ------------------------------------------
        VaultInstruction::CreateTokenMetadata { name, symbol, uri } => {
            msg!("Instruction: CreateTokenMetadata");
            process_create_token_metadata(program_id, accounts, name, symbol, uri)
        }
        VaultInstruction::UpdateTokenMetadata { name, symbol, uri } => {
            msg!("Instruction: UpdateTokenMetadata");
            process_update_token_metadata(program_id, accounts, name, symbol, uri)
        }
        VaultInstruction::SetConfigAdmin => {
            msg!("Instruction: SetConfigAdmin");
            process_set_config_admin(program_id, accounts)
        }
    }
}
