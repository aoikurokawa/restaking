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
} from '@solana/kit';
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SET_PROGRAM_FEE_WALLET_DISCRIMINATOR = 18;

export function getSetProgramFeeWalletDiscriminatorBytes() {
  return getU8Encoder().encode(SET_PROGRAM_FEE_WALLET_DISCRIMINATOR);
}

export type SetProgramFeeWalletInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountProgramFeeAdmin extends string | IAccountMeta<string> = string,
  TAccountNewFeeWallet extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountConfig extends string
        ? WritableAccount<TAccountConfig>
        : TAccountConfig,
      TAccountProgramFeeAdmin extends string
        ? ReadonlySignerAccount<TAccountProgramFeeAdmin> &
            IAccountSignerMeta<TAccountProgramFeeAdmin>
        : TAccountProgramFeeAdmin,
      TAccountNewFeeWallet extends string
        ? ReadonlyAccount<TAccountNewFeeWallet>
        : TAccountNewFeeWallet,
      ...TRemainingAccounts,
    ]
  >;

export type SetProgramFeeWalletInstructionData = { discriminator: number };

export type SetProgramFeeWalletInstructionDataArgs = {};

export function getSetProgramFeeWalletInstructionDataEncoder(): Encoder<SetProgramFeeWalletInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: SET_PROGRAM_FEE_WALLET_DISCRIMINATOR,
    })
  );
}

export function getSetProgramFeeWalletInstructionDataDecoder(): Decoder<SetProgramFeeWalletInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getSetProgramFeeWalletInstructionDataCodec(): Codec<
  SetProgramFeeWalletInstructionDataArgs,
  SetProgramFeeWalletInstructionData
> {
  return combineCodec(
    getSetProgramFeeWalletInstructionDataEncoder(),
    getSetProgramFeeWalletInstructionDataDecoder()
  );
}

export type SetProgramFeeWalletInput<
  TAccountConfig extends string = string,
  TAccountProgramFeeAdmin extends string = string,
  TAccountNewFeeWallet extends string = string,
> = {
  config: Address<TAccountConfig>;
  programFeeAdmin: TransactionSigner<TAccountProgramFeeAdmin>;
  newFeeWallet: Address<TAccountNewFeeWallet>;
};

export function getSetProgramFeeWalletInstruction<
  TAccountConfig extends string,
  TAccountProgramFeeAdmin extends string,
  TAccountNewFeeWallet extends string,
  TProgramAddress extends Address = typeof JITO_VAULT_PROGRAM_ADDRESS,
>(
  input: SetProgramFeeWalletInput<
    TAccountConfig,
    TAccountProgramFeeAdmin,
    TAccountNewFeeWallet
  >,
  config?: { programAddress?: TProgramAddress }
): SetProgramFeeWalletInstruction<
  TProgramAddress,
  TAccountConfig,
  TAccountProgramFeeAdmin,
  TAccountNewFeeWallet
> {
  // Program address.
  const programAddress = config?.programAddress ?? JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: true },
    programFeeAdmin: {
      value: input.programFeeAdmin ?? null,
      isWritable: false,
    },
    newFeeWallet: { value: input.newFeeWallet ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.programFeeAdmin),
      getAccountMeta(accounts.newFeeWallet),
    ],
    programAddress,
    data: getSetProgramFeeWalletInstructionDataEncoder().encode({}),
  } as SetProgramFeeWalletInstruction<
    TProgramAddress,
    TAccountConfig,
    TAccountProgramFeeAdmin,
    TAccountNewFeeWallet
  >;

  return instruction;
}

export type ParsedSetProgramFeeWalletInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    programFeeAdmin: TAccountMetas[1];
    newFeeWallet: TAccountMetas[2];
  };
  data: SetProgramFeeWalletInstructionData;
};

export function parseSetProgramFeeWalletInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetProgramFeeWalletInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 3) {
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
      programFeeAdmin: getNextAccount(),
      newFeeWallet: getNextAccount(),
    },
    data: getSetProgramFeeWalletInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
