//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>

pub(crate) mod r#add_delegation;
pub(crate) mod r#burn_withdrawal_ticket;
pub(crate) mod r#change_withdrawal_ticket_owner;
pub(crate) mod r#close_vault_update_state_tracker;
pub(crate) mod r#cooldown_delegation;
pub(crate) mod r#cooldown_vault_ncn_slasher_ticket;
pub(crate) mod r#cooldown_vault_ncn_ticket;
pub(crate) mod r#crank_vault_update_state_tracker;
pub(crate) mod r#create_token_metadata;
pub(crate) mod r#delegate_token_account;
pub(crate) mod r#enqueue_withdrawal;
pub(crate) mod r#initialize_config;
pub(crate) mod r#initialize_vault;
pub(crate) mod r#initialize_vault_ncn_slasher_operator_ticket;
pub(crate) mod r#initialize_vault_ncn_slasher_ticket;
pub(crate) mod r#initialize_vault_ncn_ticket;
pub(crate) mod r#initialize_vault_operator_delegation;
pub(crate) mod r#initialize_vault_update_state_tracker;
pub(crate) mod r#initialize_vault_with_mint;
pub(crate) mod r#mint_to;
pub(crate) mod r#set_admin;
pub(crate) mod r#set_config_admin;
pub(crate) mod r#set_deposit_capacity;
pub(crate) mod r#set_fees;
pub(crate) mod r#set_is_paused;
pub(crate) mod r#set_program_fee;
pub(crate) mod r#set_program_fee_wallet;
pub(crate) mod r#set_secondary_admin;
pub(crate) mod r#update_token_metadata;
pub(crate) mod r#update_vault_balance;
pub(crate) mod r#warmup_vault_ncn_slasher_ticket;
pub(crate) mod r#warmup_vault_ncn_ticket;

pub use self::{
    r#add_delegation::*, r#burn_withdrawal_ticket::*, r#change_withdrawal_ticket_owner::*,
    r#close_vault_update_state_tracker::*, r#cooldown_delegation::*,
    r#cooldown_vault_ncn_slasher_ticket::*, r#cooldown_vault_ncn_ticket::*,
    r#crank_vault_update_state_tracker::*, r#create_token_metadata::*, r#delegate_token_account::*,
    r#enqueue_withdrawal::*, r#initialize_config::*, r#initialize_vault::*,
    r#initialize_vault_ncn_slasher_operator_ticket::*, r#initialize_vault_ncn_slasher_ticket::*,
    r#initialize_vault_ncn_ticket::*, r#initialize_vault_operator_delegation::*,
    r#initialize_vault_update_state_tracker::*, r#initialize_vault_with_mint::*, r#mint_to::*,
    r#set_admin::*, r#set_config_admin::*, r#set_deposit_capacity::*, r#set_fees::*,
    r#set_is_paused::*, r#set_program_fee::*, r#set_program_fee_wallet::*,
    r#set_secondary_admin::*, r#update_token_metadata::*, r#update_vault_balance::*,
    r#warmup_vault_ncn_slasher_ticket::*, r#warmup_vault_ncn_ticket::*,
};
