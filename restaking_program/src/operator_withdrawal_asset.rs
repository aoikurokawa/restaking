use jito_bytemuck::AccountDeserialize;
use jito_jsm_core::loader::{load_associated_token_account, load_signer};
use jito_restaking_core::operator::Operator;
use jito_restaking_sdk::error::RestakingError;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, msg, program::invoke_signed,
    program_error::ProgramError, pubkey::Pubkey,
};
use spl_token_2022::{extension::StateWithExtensions, state::Mint};

pub fn process_operator_withdrawal_asset(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    token_mint: Pubkey,
    amount: u64,
) -> ProgramResult {
    let [operator_info, mint_info, operator_withdraw_admin, operator_token_account, receiver_token_account, token_program] =
        accounts
    else {
        return Err(ProgramError::NotEnoughAccountKeys);
    };

    Operator::load(program_id, operator_info, false)?;
    load_signer(operator_withdraw_admin, false)?;
    load_associated_token_account(operator_token_account, operator_info.key, &token_mint)?;
    let operator_data = operator_info.data.borrow();
    let operator = Operator::try_from_slice_unchecked(&operator_data)?;
    load_associated_token_account(
        receiver_token_account,
        &operator.withdrawal_fee_wallet,
        &token_mint,
    )?;

    // The Operator withdraw admin shall be the signer of the transaction
    if operator.withdrawal_admin.ne(operator_withdraw_admin.key) {
        msg!("Invalid operator withdraw admin");
        return Err(RestakingError::OperatorWithdrawAdminInvalid.into());
    }

    let mut operator_seeds = Operator::seeds(&operator.base);
    operator_seeds.push(vec![operator.bump]);
    let ncn_seeds_slice = operator_seeds
        .iter()
        .map(|seed| seed.as_slice())
        .collect::<Vec<&[u8]>>();

    let mint_data = mint_info.try_borrow_data()?;
    let mint = StateWithExtensions::<Mint>::unpack(&mint_data)?;

    _withdraw_operator_asset(
        token_program,
        operator_info,
        operator_token_account,
        receiver_token_account,
        mint_info,
        &ncn_seeds_slice,
        amount,
        mint.base.decimals,
    )?;

    Ok(())
}

fn _withdraw_operator_asset<'a, 'info>(
    token_program: &'a AccountInfo<'info>,
    operator: &'a AccountInfo<'info>,
    operator_token_account: &'a AccountInfo<'info>,
    receiver_token_account: &'a AccountInfo<'info>,
    mint: &'a AccountInfo<'info>,
    seeds: &[&[u8]],
    amount: u64,
    decimals: u8,
) -> ProgramResult {
    invoke_signed(
        &spl_token_2022::instruction::transfer_checked(
            token_program.key,
            operator_token_account.key,
            mint.key,
            receiver_token_account.key,
            operator.key,
            &[],
            amount,
            decimals,
        )?,
        &[
            operator_token_account.clone(),
            receiver_token_account.clone(),
            operator.clone(),
        ],
        &[seeds],
    )?;

    Ok(())
}
