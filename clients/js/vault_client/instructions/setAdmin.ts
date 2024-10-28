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
} from '@solana/web3.js';
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const SET_ADMIN_DISCRIMINATOR = 21;

export function getSetAdminDiscriminatorBytes() {
  return getU8Encoder().encode(SET_ADMIN_DISCRIMINATOR);
}

export type SetAdminInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountOldAdmin extends string | IAccountMeta<string> = string,
  TAccountNewAdmin extends string | IAccountMeta<string> = string,
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
      TAccountOldAdmin extends string
        ? ReadonlySignerAccount<TAccountOldAdmin> &
            IAccountSignerMeta<TAccountOldAdmin>
        : TAccountOldAdmin,
      TAccountNewAdmin extends string
        ? ReadonlySignerAccount<TAccountNewAdmin> &
            IAccountSignerMeta<TAccountNewAdmin>
        : TAccountNewAdmin,
      ...TRemainingAccounts,
    ]
  >;

export type SetAdminInstructionData = { discriminator: number };

export type SetAdminInstructionDataArgs = {};

export function getSetAdminInstructionDataEncoder(): Encoder<SetAdminInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: SET_ADMIN_DISCRIMINATOR })
  );
}

export function getSetAdminInstructionDataDecoder(): Decoder<SetAdminInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getSetAdminInstructionDataCodec(): Codec<
  SetAdminInstructionDataArgs,
  SetAdminInstructionData
> {
  return combineCodec(
    getSetAdminInstructionDataEncoder(),
    getSetAdminInstructionDataDecoder()
  );
}

export type SetAdminInput<
  TAccountConfig extends string = string,
  TAccountVault extends string = string,
  TAccountOldAdmin extends string = string,
  TAccountNewAdmin extends string = string,
> = {
  config: Address<TAccountConfig>;
  vault: Address<TAccountVault>;
  oldAdmin: TransactionSigner<TAccountOldAdmin>;
  newAdmin: TransactionSigner<TAccountNewAdmin>;
};

export function getSetAdminInstruction<
  TAccountConfig extends string,
  TAccountVault extends string,
  TAccountOldAdmin extends string,
  TAccountNewAdmin extends string,
>(
  input: SetAdminInput<
    TAccountConfig,
    TAccountVault,
    TAccountOldAdmin,
    TAccountNewAdmin
  >
): SetAdminInstruction<
  typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig,
  TAccountVault,
  TAccountOldAdmin,
  TAccountNewAdmin
> {
  // Program address.
  const programAddress = JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    oldAdmin: { value: input.oldAdmin ?? null, isWritable: false },
    newAdmin: { value: input.newAdmin ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.oldAdmin),
      getAccountMeta(accounts.newAdmin),
    ],
    programAddress,
    data: getSetAdminInstructionDataEncoder().encode({}),
  } as SetAdminInstruction<
    typeof JITO_VAULT_PROGRAM_ADDRESS,
    TAccountConfig,
    TAccountVault,
    TAccountOldAdmin,
    TAccountNewAdmin
  >;

  return instruction;
}

export type ParsedSetAdminInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    vault: TAccountMetas[1];
    oldAdmin: TAccountMetas[2];
    newAdmin: TAccountMetas[3];
  };
  data: SetAdminInstructionData;
};

export function parseSetAdminInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetAdminInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 4) {
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
      oldAdmin: getNextAccount(),
      newAdmin: getNextAccount(),
    },
    data: getSetAdminInstructionDataDecoder().decode(instruction.data),
  };
}
