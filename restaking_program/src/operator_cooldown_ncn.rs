use jito_account_traits::AccountDeserialize;
use jito_jsm_core::loader::load_signer;
use jito_restaking_core::{
    config::Config,
    loader::{load_config, load_ncn, load_ncn_operator_state, load_operator},
    ncn_operator_state::NcnOperatorState,
    operator::Operator,
};
use jito_restaking_sdk::error::RestakingError;
use solana_program::{
    account_info::AccountInfo, clock::Clock, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey, sysvar::Sysvar,
};

/// [`crate::RestakingInstruction::OperatorCooldownNcn`]
pub fn process_operator_cooldown_ncn(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
) -> ProgramResult {
    let [config, ncn, operator, ncn_operator_state, operator_ncn_admin] = accounts else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };

    load_config(program_id, config, false)?;
    load_operator(program_id, operator, false)?;
    load_ncn(program_id, ncn, false)?;
    load_ncn_operator_state(program_id, ncn_operator_state, ncn, operator, true)?;
    load_signer(operator_ncn_admin, false)?;

    // The operator NCN admin shall be the signer of the transaction
    let operator_data = operator.data.borrow();
    let operator = Operator::try_from_slice(&operator_data)?;
    if operator.ncn_admin.ne(operator_ncn_admin.key) {
        msg!("Invalid operator NCN admin");
        return Err(RestakingError::OperatorNcnAdminInvalid.into());
    }

    // The OperatorNcnTicket shall be active before it can be cooled down
    let mut config_data = config.data.borrow_mut();
    let config = Config::try_from_slice_mut(&mut config_data)?;
    let mut ncn_operator_state_data = ncn_operator_state.data.borrow_mut();
    let ncn_operator_state = NcnOperatorState::try_from_slice_mut(&mut ncn_operator_state_data)?;
    if !ncn_operator_state
        .operator_opt_in_state
        .deactivate(Clock::get()?.slot, config.epoch_length)
    {
        msg!("Operator is not ready to deactivate NCN");
        return Err(RestakingError::OperatorCooldownNcnFailed.into());
    }

    Ok(())
}