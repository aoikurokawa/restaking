//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>

use borsh::{BorshDeserialize, BorshSerialize};

/// Accounts.
pub struct NcnDelegateTokenAccount {
    pub ncn: solana_program::pubkey::Pubkey,

    pub delegate_admin: solana_program::pubkey::Pubkey,

    pub token_mint: solana_program::pubkey::Pubkey,

    pub token_account: solana_program::pubkey::Pubkey,

    pub delegate: solana_program::pubkey::Pubkey,

    pub token_program: solana_program::pubkey::Pubkey,
}

impl NcnDelegateTokenAccount {
    pub fn instruction(&self) -> solana_program::instruction::Instruction {
        self.instruction_with_remaining_accounts(&[])
    }
    #[allow(clippy::vec_init_then_push)]
    pub fn instruction_with_remaining_accounts(
        &self,
        remaining_accounts: &[solana_program::instruction::AccountMeta],
    ) -> solana_program::instruction::Instruction {
        let mut accounts = Vec::with_capacity(6 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.ncn, false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.delegate_admin,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.token_mint,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            self.token_account,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.delegate,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            self.token_program,
            false,
        ));
        accounts.extend_from_slice(remaining_accounts);
        let data = NcnDelegateTokenAccountInstructionData::new()
            .try_to_vec()
            .unwrap();

        solana_program::instruction::Instruction {
            program_id: crate::JITO_RESTAKING_ID,
            accounts,
            data,
        }
    }
}

#[derive(BorshDeserialize, BorshSerialize)]
pub struct NcnDelegateTokenAccountInstructionData {
    discriminator: u8,
}

impl NcnDelegateTokenAccountInstructionData {
    pub fn new() -> Self {
        Self { discriminator: 22 }
    }
}

impl Default for NcnDelegateTokenAccountInstructionData {
    fn default() -> Self {
        Self::new()
    }
}

/// Instruction builder for `NcnDelegateTokenAccount`.
///
/// ### Accounts:
///
///   0. `[]` ncn
///   1. `[signer]` delegate_admin
///   2. `[]` token_mint
///   3. `[writable]` token_account
///   4. `[]` delegate
///   5. `[optional]` token_program (default to `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`)
#[derive(Clone, Debug, Default)]
pub struct NcnDelegateTokenAccountBuilder {
    ncn: Option<solana_program::pubkey::Pubkey>,
    delegate_admin: Option<solana_program::pubkey::Pubkey>,
    token_mint: Option<solana_program::pubkey::Pubkey>,
    token_account: Option<solana_program::pubkey::Pubkey>,
    delegate: Option<solana_program::pubkey::Pubkey>,
    token_program: Option<solana_program::pubkey::Pubkey>,
    __remaining_accounts: Vec<solana_program::instruction::AccountMeta>,
}

impl NcnDelegateTokenAccountBuilder {
    pub fn new() -> Self {
        Self::default()
    }
    #[inline(always)]
    pub fn ncn(&mut self, ncn: solana_program::pubkey::Pubkey) -> &mut Self {
        self.ncn = Some(ncn);
        self
    }
    #[inline(always)]
    pub fn delegate_admin(&mut self, delegate_admin: solana_program::pubkey::Pubkey) -> &mut Self {
        self.delegate_admin = Some(delegate_admin);
        self
    }
    #[inline(always)]
    pub fn token_mint(&mut self, token_mint: solana_program::pubkey::Pubkey) -> &mut Self {
        self.token_mint = Some(token_mint);
        self
    }
    #[inline(always)]
    pub fn token_account(&mut self, token_account: solana_program::pubkey::Pubkey) -> &mut Self {
        self.token_account = Some(token_account);
        self
    }
    #[inline(always)]
    pub fn delegate(&mut self, delegate: solana_program::pubkey::Pubkey) -> &mut Self {
        self.delegate = Some(delegate);
        self
    }
    /// `[optional account, default to 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA']`
    #[inline(always)]
    pub fn token_program(&mut self, token_program: solana_program::pubkey::Pubkey) -> &mut Self {
        self.token_program = Some(token_program);
        self
    }
    /// Add an additional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: solana_program::instruction::AccountMeta,
    ) -> &mut Self {
        self.__remaining_accounts.push(account);
        self
    }
    /// Add additional accounts to the instruction.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[solana_program::instruction::AccountMeta],
    ) -> &mut Self {
        self.__remaining_accounts.extend_from_slice(accounts);
        self
    }
    #[allow(clippy::clone_on_copy)]
    pub fn instruction(&self) -> solana_program::instruction::Instruction {
        let accounts = NcnDelegateTokenAccount {
            ncn: self.ncn.expect("ncn is not set"),
            delegate_admin: self.delegate_admin.expect("delegate_admin is not set"),
            token_mint: self.token_mint.expect("token_mint is not set"),
            token_account: self.token_account.expect("token_account is not set"),
            delegate: self.delegate.expect("delegate is not set"),
            token_program: self.token_program.unwrap_or(solana_program::pubkey!(
                "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
            )),
        };

        accounts.instruction_with_remaining_accounts(&self.__remaining_accounts)
    }
}

/// `ncn_delegate_token_account` CPI accounts.
pub struct NcnDelegateTokenAccountCpiAccounts<'a, 'b> {
    pub ncn: &'b solana_program::account_info::AccountInfo<'a>,

    pub delegate_admin: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_account: &'b solana_program::account_info::AccountInfo<'a>,

    pub delegate: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_program: &'b solana_program::account_info::AccountInfo<'a>,
}

/// `ncn_delegate_token_account` CPI instruction.
pub struct NcnDelegateTokenAccountCpi<'a, 'b> {
    /// The program to invoke.
    pub __program: &'b solana_program::account_info::AccountInfo<'a>,

    pub ncn: &'b solana_program::account_info::AccountInfo<'a>,

    pub delegate_admin: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_mint: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_account: &'b solana_program::account_info::AccountInfo<'a>,

    pub delegate: &'b solana_program::account_info::AccountInfo<'a>,

    pub token_program: &'b solana_program::account_info::AccountInfo<'a>,
}

impl<'a, 'b> NcnDelegateTokenAccountCpi<'a, 'b> {
    pub fn new(
        program: &'b solana_program::account_info::AccountInfo<'a>,
        accounts: NcnDelegateTokenAccountCpiAccounts<'a, 'b>,
    ) -> Self {
        Self {
            __program: program,
            ncn: accounts.ncn,
            delegate_admin: accounts.delegate_admin,
            token_mint: accounts.token_mint,
            token_account: accounts.token_account,
            delegate: accounts.delegate,
            token_program: accounts.token_program,
        }
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], &[])
    }
    #[inline(always)]
    pub fn invoke_with_remaining_accounts(
        &self,
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(&[], remaining_accounts)
    }
    #[inline(always)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed_with_remaining_accounts(signers_seeds, &[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed_with_remaining_accounts(
        &self,
        signers_seeds: &[&[&[u8]]],
        remaining_accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> solana_program::entrypoint::ProgramResult {
        let mut accounts = Vec::with_capacity(6 + remaining_accounts.len());
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.ncn.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.delegate_admin.key,
            true,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.token_mint.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new(
            *self.token_account.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.delegate.key,
            false,
        ));
        accounts.push(solana_program::instruction::AccountMeta::new_readonly(
            *self.token_program.key,
            false,
        ));
        remaining_accounts.iter().for_each(|remaining_account| {
            accounts.push(solana_program::instruction::AccountMeta {
                pubkey: *remaining_account.0.key,
                is_signer: remaining_account.1,
                is_writable: remaining_account.2,
            })
        });
        let data = NcnDelegateTokenAccountInstructionData::new()
            .try_to_vec()
            .unwrap();

        let instruction = solana_program::instruction::Instruction {
            program_id: crate::JITO_RESTAKING_ID,
            accounts,
            data,
        };
        let mut account_infos = Vec::with_capacity(7 + remaining_accounts.len());
        account_infos.push(self.__program.clone());
        account_infos.push(self.ncn.clone());
        account_infos.push(self.delegate_admin.clone());
        account_infos.push(self.token_mint.clone());
        account_infos.push(self.token_account.clone());
        account_infos.push(self.delegate.clone());
        account_infos.push(self.token_program.clone());
        remaining_accounts
            .iter()
            .for_each(|remaining_account| account_infos.push(remaining_account.0.clone()));

        if signers_seeds.is_empty() {
            solana_program::program::invoke(&instruction, &account_infos)
        } else {
            solana_program::program::invoke_signed(&instruction, &account_infos, signers_seeds)
        }
    }
}

/// Instruction builder for `NcnDelegateTokenAccount` via CPI.
///
/// ### Accounts:
///
///   0. `[]` ncn
///   1. `[signer]` delegate_admin
///   2. `[]` token_mint
///   3. `[writable]` token_account
///   4. `[]` delegate
///   5. `[]` token_program
#[derive(Clone, Debug)]
pub struct NcnDelegateTokenAccountCpiBuilder<'a, 'b> {
    instruction: Box<NcnDelegateTokenAccountCpiBuilderInstruction<'a, 'b>>,
}

impl<'a, 'b> NcnDelegateTokenAccountCpiBuilder<'a, 'b> {
    pub fn new(program: &'b solana_program::account_info::AccountInfo<'a>) -> Self {
        let instruction = Box::new(NcnDelegateTokenAccountCpiBuilderInstruction {
            __program: program,
            ncn: None,
            delegate_admin: None,
            token_mint: None,
            token_account: None,
            delegate: None,
            token_program: None,
            __remaining_accounts: Vec::new(),
        });
        Self { instruction }
    }
    #[inline(always)]
    pub fn ncn(&mut self, ncn: &'b solana_program::account_info::AccountInfo<'a>) -> &mut Self {
        self.instruction.ncn = Some(ncn);
        self
    }
    #[inline(always)]
    pub fn delegate_admin(
        &mut self,
        delegate_admin: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.delegate_admin = Some(delegate_admin);
        self
    }
    #[inline(always)]
    pub fn token_mint(
        &mut self,
        token_mint: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.token_mint = Some(token_mint);
        self
    }
    #[inline(always)]
    pub fn token_account(
        &mut self,
        token_account: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.token_account = Some(token_account);
        self
    }
    #[inline(always)]
    pub fn delegate(
        &mut self,
        delegate: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.delegate = Some(delegate);
        self
    }
    #[inline(always)]
    pub fn token_program(
        &mut self,
        token_program: &'b solana_program::account_info::AccountInfo<'a>,
    ) -> &mut Self {
        self.instruction.token_program = Some(token_program);
        self
    }
    /// Add an additional account to the instruction.
    #[inline(always)]
    pub fn add_remaining_account(
        &mut self,
        account: &'b solana_program::account_info::AccountInfo<'a>,
        is_writable: bool,
        is_signer: bool,
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .push((account, is_writable, is_signer));
        self
    }
    /// Add additional accounts to the instruction.
    ///
    /// Each account is represented by a tuple of the `AccountInfo`, a `bool` indicating whether the account is writable or not,
    /// and a `bool` indicating whether the account is a signer or not.
    #[inline(always)]
    pub fn add_remaining_accounts(
        &mut self,
        accounts: &[(
            &'b solana_program::account_info::AccountInfo<'a>,
            bool,
            bool,
        )],
    ) -> &mut Self {
        self.instruction
            .__remaining_accounts
            .extend_from_slice(accounts);
        self
    }
    #[inline(always)]
    pub fn invoke(&self) -> solana_program::entrypoint::ProgramResult {
        self.invoke_signed(&[])
    }
    #[allow(clippy::clone_on_copy)]
    #[allow(clippy::vec_init_then_push)]
    pub fn invoke_signed(
        &self,
        signers_seeds: &[&[&[u8]]],
    ) -> solana_program::entrypoint::ProgramResult {
        let instruction = NcnDelegateTokenAccountCpi {
            __program: self.instruction.__program,

            ncn: self.instruction.ncn.expect("ncn is not set"),

            delegate_admin: self
                .instruction
                .delegate_admin
                .expect("delegate_admin is not set"),

            token_mint: self.instruction.token_mint.expect("token_mint is not set"),

            token_account: self
                .instruction
                .token_account
                .expect("token_account is not set"),

            delegate: self.instruction.delegate.expect("delegate is not set"),

            token_program: self
                .instruction
                .token_program
                .expect("token_program is not set"),
        };
        instruction.invoke_signed_with_remaining_accounts(
            signers_seeds,
            &self.instruction.__remaining_accounts,
        )
    }
}

#[derive(Clone, Debug)]
struct NcnDelegateTokenAccountCpiBuilderInstruction<'a, 'b> {
    __program: &'b solana_program::account_info::AccountInfo<'a>,
    ncn: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    delegate_admin: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    token_mint: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    token_account: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    delegate: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    token_program: Option<&'b solana_program::account_info::AccountInfo<'a>>,
    /// Additional instruction accounts `(AccountInfo, is_writable, is_signer)`.
    __remaining_accounts: Vec<(
        &'b solana_program::account_info::AccountInfo<'a>,
        bool,
        bool,
    )>,
}
