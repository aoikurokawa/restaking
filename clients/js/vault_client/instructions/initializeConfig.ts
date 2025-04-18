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
  getU16Decoder,
  getU16Encoder,
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
  type TransactionSigner,
  type WritableAccount,
  type WritableSignerAccount,
} from '@solana/web3.js';
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_CONFIG_DISCRIMINATOR = 0;

export function getInitializeConfigDiscriminatorBytes() {
  return getU8Encoder().encode(INITIALIZE_CONFIG_DISCRIMINATOR);
}

export type InitializeConfigInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountRestakingProgram extends string | IAccountMeta<string> = string,
  TAccountProgramFeeWallet extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountConfig extends string
        ? WritableAccount<TAccountConfig>
        : TAccountConfig,
      TAccountAdmin extends string
        ? WritableSignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountRestakingProgram extends string
        ? ReadonlyAccount<TAccountRestakingProgram>
        : TAccountRestakingProgram,
      TAccountProgramFeeWallet extends string
        ? ReadonlyAccount<TAccountProgramFeeWallet>
        : TAccountProgramFeeWallet,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeConfigInstructionData = {
  discriminator: number;
  programFeeBps: number;
};

export type InitializeConfigInstructionDataArgs = { programFeeBps: number };

export function getInitializeConfigInstructionDataEncoder(): Encoder<InitializeConfigInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['programFeeBps', getU16Encoder()],
    ]),
    (value) => ({ ...value, discriminator: INITIALIZE_CONFIG_DISCRIMINATOR })
  );
}

export function getInitializeConfigInstructionDataDecoder(): Decoder<InitializeConfigInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['programFeeBps', getU16Decoder()],
  ]);
}

export function getInitializeConfigInstructionDataCodec(): Codec<
  InitializeConfigInstructionDataArgs,
  InitializeConfigInstructionData
> {
  return combineCodec(
    getInitializeConfigInstructionDataEncoder(),
    getInitializeConfigInstructionDataDecoder()
  );
}

export type InitializeConfigInput<
  TAccountConfig extends string = string,
  TAccountAdmin extends string = string,
  TAccountRestakingProgram extends string = string,
  TAccountProgramFeeWallet extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  config: Address<TAccountConfig>;
  admin: TransactionSigner<TAccountAdmin>;
  restakingProgram: Address<TAccountRestakingProgram>;
  programFeeWallet: Address<TAccountProgramFeeWallet>;
  systemProgram?: Address<TAccountSystemProgram>;
  programFeeBps: InitializeConfigInstructionDataArgs['programFeeBps'];
};

export function getInitializeConfigInstruction<
  TAccountConfig extends string,
  TAccountAdmin extends string,
  TAccountRestakingProgram extends string,
  TAccountProgramFeeWallet extends string,
  TAccountSystemProgram extends string,
  TProgramAddress extends Address = typeof JITO_VAULT_PROGRAM_ADDRESS,
>(
  input: InitializeConfigInput<
    TAccountConfig,
    TAccountAdmin,
    TAccountRestakingProgram,
    TAccountProgramFeeWallet,
    TAccountSystemProgram
  >,
  config?: { programAddress?: TProgramAddress }
): InitializeConfigInstruction<
  TProgramAddress,
  TAccountConfig,
  TAccountAdmin,
  TAccountRestakingProgram,
  TAccountProgramFeeWallet,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = config?.programAddress ?? JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: true },
    admin: { value: input.admin ?? null, isWritable: true },
    restakingProgram: {
      value: input.restakingProgram ?? null,
      isWritable: false,
    },
    programFeeWallet: {
      value: input.programFeeWallet ?? null,
      isWritable: false,
    },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.restakingProgram),
      getAccountMeta(accounts.programFeeWallet),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeConfigInstructionDataEncoder().encode(
      args as InitializeConfigInstructionDataArgs
    ),
  } as InitializeConfigInstruction<
    TProgramAddress,
    TAccountConfig,
    TAccountAdmin,
    TAccountRestakingProgram,
    TAccountProgramFeeWallet,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitializeConfigInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    admin: TAccountMetas[1];
    restakingProgram: TAccountMetas[2];
    programFeeWallet: TAccountMetas[3];
    systemProgram: TAccountMetas[4];
  };
  data: InitializeConfigInstructionData;
};

export function parseInitializeConfigInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeConfigInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
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
      admin: getNextAccount(),
      restakingProgram: getNextAccount(),
      programFeeWallet: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitializeConfigInstructionDataDecoder().decode(instruction.data),
  };
}
