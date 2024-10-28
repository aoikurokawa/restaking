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
import {
  getVaultAdminRoleDecoder,
  getVaultAdminRoleEncoder,
  type VaultAdminRole,
  type VaultAdminRoleArgs,
} from '../types';

export const SET_SECONDARY_ADMIN_DISCRIMINATOR = 22;

export function getSetSecondaryAdminDiscriminatorBytes() {
  return getU8Encoder().encode(SET_SECONDARY_ADMIN_DISCRIMINATOR);
}

export type SetSecondaryAdminInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
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
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountNewAdmin extends string
        ? ReadonlyAccount<TAccountNewAdmin>
        : TAccountNewAdmin,
      ...TRemainingAccounts,
    ]
  >;

export type SetSecondaryAdminInstructionData = {
  discriminator: number;
  vaultAdminRole: VaultAdminRole;
};

export type SetSecondaryAdminInstructionDataArgs = {
  vaultAdminRole: VaultAdminRoleArgs;
};

export function getSetSecondaryAdminInstructionDataEncoder(): Encoder<SetSecondaryAdminInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['vaultAdminRole', getVaultAdminRoleEncoder()],
    ]),
    (value) => ({ ...value, discriminator: SET_SECONDARY_ADMIN_DISCRIMINATOR })
  );
}

export function getSetSecondaryAdminInstructionDataDecoder(): Decoder<SetSecondaryAdminInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['vaultAdminRole', getVaultAdminRoleDecoder()],
  ]);
}

export function getSetSecondaryAdminInstructionDataCodec(): Codec<
  SetSecondaryAdminInstructionDataArgs,
  SetSecondaryAdminInstructionData
> {
  return combineCodec(
    getSetSecondaryAdminInstructionDataEncoder(),
    getSetSecondaryAdminInstructionDataDecoder()
  );
}

export type SetSecondaryAdminInput<
  TAccountConfig extends string = string,
  TAccountVault extends string = string,
  TAccountAdmin extends string = string,
  TAccountNewAdmin extends string = string,
> = {
  config: Address<TAccountConfig>;
  vault: Address<TAccountVault>;
  admin: TransactionSigner<TAccountAdmin>;
  newAdmin: Address<TAccountNewAdmin>;
  vaultAdminRole: SetSecondaryAdminInstructionDataArgs['vaultAdminRole'];
};

export function getSetSecondaryAdminInstruction<
  TAccountConfig extends string,
  TAccountVault extends string,
  TAccountAdmin extends string,
  TAccountNewAdmin extends string,
>(
  input: SetSecondaryAdminInput<
    TAccountConfig,
    TAccountVault,
    TAccountAdmin,
    TAccountNewAdmin
  >
): SetSecondaryAdminInstruction<
  typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig,
  TAccountVault,
  TAccountAdmin,
  TAccountNewAdmin
> {
  // Program address.
  const programAddress = JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    admin: { value: input.admin ?? null, isWritable: false },
    newAdmin: { value: input.newAdmin ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.newAdmin),
    ],
    programAddress,
    data: getSetSecondaryAdminInstructionDataEncoder().encode(
      args as SetSecondaryAdminInstructionDataArgs
    ),
  } as SetSecondaryAdminInstruction<
    typeof JITO_VAULT_PROGRAM_ADDRESS,
    TAccountConfig,
    TAccountVault,
    TAccountAdmin,
    TAccountNewAdmin
  >;

  return instruction;
}

export type ParsedSetSecondaryAdminInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    vault: TAccountMetas[1];
    admin: TAccountMetas[2];
    newAdmin: TAccountMetas[3];
  };
  data: SetSecondaryAdminInstructionData;
};

export function parseSetSecondaryAdminInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedSetSecondaryAdminInstruction<TProgram, TAccountMetas> {
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
      admin: getNextAccount(),
      newAdmin: getNextAccount(),
    },
    data: getSetSecondaryAdminInstructionDataDecoder().decode(instruction.data),
  };
}
