/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/kit';
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_VAULT_OPERATOR_DELEGATION_DISCRIMINATOR = 3;

export function getInitializeVaultOperatorDelegationDiscriminatorBytes() {
  return getU8Encoder().encode(
    INITIALIZE_VAULT_OPERATOR_DELEGATION_DISCRIMINATOR
  );
}

export type InitializeVaultOperatorDelegationInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountOperator extends string | IAccountMeta<string> = string,
  TAccountOperatorVaultTicket extends string | IAccountMeta<string> = string,
  TAccountVaultOperatorDelegation extends
    | string
    | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountConfig extends string
        ? ReadonlyAccount<TAccountConfig>
        : TAccountConfig,
      TAccountVault extends string
        ? WritableAccount<TAccountVault>
        : TAccountVault,
      TAccountOperator extends string
        ? WritableAccount<TAccountOperator>
        : TAccountOperator,
      TAccountOperatorVaultTicket extends string
        ? ReadonlyAccount<TAccountOperatorVaultTicket>
        : TAccountOperatorVaultTicket,
      TAccountVaultOperatorDelegation extends string
        ? WritableAccount<TAccountVaultOperatorDelegation>
        : TAccountVaultOperatorDelegation,
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountPayer extends string
        ? WritableSignerAccount<TAccountPayer> &
            IAccountSignerMeta<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeVaultOperatorDelegationInstructionData = {
  discriminator: number;
};

export type InitializeVaultOperatorDelegationInstructionDataArgs = {};

export function getInitializeVaultOperatorDelegationInstructionDataEncoder(): Encoder<InitializeVaultOperatorDelegationInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: INITIALIZE_VAULT_OPERATOR_DELEGATION_DISCRIMINATOR,
    })
  );
}

export function getInitializeVaultOperatorDelegationInstructionDataDecoder(): Decoder<InitializeVaultOperatorDelegationInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getInitializeVaultOperatorDelegationInstructionDataCodec(): Codec<
  InitializeVaultOperatorDelegationInstructionDataArgs,
  InitializeVaultOperatorDelegationInstructionData
> {
  return combineCodec(
    getInitializeVaultOperatorDelegationInstructionDataEncoder(),
    getInitializeVaultOperatorDelegationInstructionDataDecoder()
  );
}

export type InitializeVaultOperatorDelegationInput<
  TAccountConfig extends string = string,
  TAccountVault extends string = string,
  TAccountOperator extends string = string,
  TAccountOperatorVaultTicket extends string = string,
  TAccountVaultOperatorDelegation extends string = string,
  TAccountAdmin extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  config: Address<TAccountConfig>;
  vault: Address<TAccountVault>;
  operator: Address<TAccountOperator>;
  operatorVaultTicket: Address<TAccountOperatorVaultTicket>;
  vaultOperatorDelegation: Address<TAccountVaultOperatorDelegation>;
  admin: TransactionSigner<TAccountAdmin>;
  payer: TransactionSigner<TAccountPayer>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getInitializeVaultOperatorDelegationInstruction<
  TAccountConfig extends string,
  TAccountVault extends string,
  TAccountOperator extends string,
  TAccountOperatorVaultTicket extends string,
  TAccountVaultOperatorDelegation extends string,
  TAccountAdmin extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof JITO_VAULT_PROGRAM_ADDRESS,
>(
  input: InitializeVaultOperatorDelegationInput<
    TAccountConfig,
    TAccountVault,
    TAccountOperator,
    TAccountOperatorVaultTicket,
    TAccountVaultOperatorDelegation,
    TAccountAdmin,
    TAccountPayer,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeVaultOperatorDelegationInstruction<
  TProgramAddress,
  TAccountConfig,
  TAccountVault,
  TAccountOperator,
  TAccountOperatorVaultTicket,
  TAccountVaultOperatorDelegation,
  TAccountAdmin,
  TAccountPayer,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    operator: { value: input.operator ?? null, isWritable: true },
    operatorVaultTicket: {
      value: input.operatorVaultTicket ?? null,
      isWritable: false,
    },
    vaultOperatorDelegation: {
      value: input.vaultOperatorDelegation ?? null,
      isWritable: true,
    },
    admin: { value: input.admin ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: true },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.operator),
      getAccountMeta(accounts.operatorVaultTicket),
      getAccountMeta(accounts.vaultOperatorDelegation),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeVaultOperatorDelegationInstructionDataEncoder().encode(
      {}
    ),
  } as InitializeVaultOperatorDelegationInstruction<
    TProgramAddress,
    TAccountConfig,
    TAccountVault,
    TAccountOperator,
    TAccountOperatorVaultTicket,
    TAccountVaultOperatorDelegation,
    TAccountAdmin,
    TAccountPayer,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitializeVaultOperatorDelegationInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    vault: TAccountMetas[1];
    operator: TAccountMetas[2];
    operatorVaultTicket: TAccountMetas[3];
    vaultOperatorDelegation: TAccountMetas[4];
    admin: TAccountMetas[5];
    payer: TAccountMetas[6];
    systemProgram: TAccountMetas[7];
  };
  data: InitializeVaultOperatorDelegationInstructionData;
};

export function parseInitializeVaultOperatorDelegationInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeVaultOperatorDelegationInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 8) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      config: getNextAccount(),
      vault: getNextAccount(),
      operator: getNextAccount(),
      operatorVaultTicket: getNextAccount(),
      vaultOperatorDelegation: getNextAccount(),
      admin: getNextAccount(),
      payer: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitializeVaultOperatorDelegationInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
