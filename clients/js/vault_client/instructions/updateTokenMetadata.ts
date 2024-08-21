/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  addDecoderSizePrefix,
  addEncoderSizePrefix,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU32Decoder,
  getU32Encoder,
  getU8Decoder,
  getU8Encoder,
  getUtf8Decoder,
  getUtf8Encoder,
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

export const UPDATE_TOKEN_METADATA_DISCRIMINATOR = 28;

export function getUpdateTokenMetadataDiscriminatorBytes() {
  return getU8Encoder().encode(UPDATE_TOKEN_METADATA_DISCRIMINATOR);
}

export type UpdateTokenMetadataInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountAdmin extends string | IAccountMeta<string> = string,
  TAccountMetadata extends string | IAccountMeta<string> = string,
  TAccountMplTokenMetadataProgram extends
    | string
    | IAccountMeta<string> = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountVault extends string
        ? ReadonlyAccount<TAccountVault>
        : TAccountVault,
      TAccountAdmin extends string
        ? ReadonlySignerAccount<TAccountAdmin> &
            IAccountSignerMeta<TAccountAdmin>
        : TAccountAdmin,
      TAccountMetadata extends string
        ? WritableAccount<TAccountMetadata>
        : TAccountMetadata,
      TAccountMplTokenMetadataProgram extends string
        ? ReadonlyAccount<TAccountMplTokenMetadataProgram>
        : TAccountMplTokenMetadataProgram,
      ...TRemainingAccounts,
    ]
  >;

export type UpdateTokenMetadataInstructionData = {
  discriminator: number;
  name: string;
  symbol: string;
  uri: string;
};

export type UpdateTokenMetadataInstructionDataArgs = {
  name: string;
  symbol: string;
  uri: string;
};

export function getUpdateTokenMetadataInstructionDataEncoder(): Encoder<UpdateTokenMetadataInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['name', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['symbol', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
      ['uri', addEncoderSizePrefix(getUtf8Encoder(), getU32Encoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: UPDATE_TOKEN_METADATA_DISCRIMINATOR,
    })
  );
}

export function getUpdateTokenMetadataInstructionDataDecoder(): Decoder<UpdateTokenMetadataInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['name', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['symbol', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
    ['uri', addDecoderSizePrefix(getUtf8Decoder(), getU32Decoder())],
  ]);
}

export function getUpdateTokenMetadataInstructionDataCodec(): Codec<
  UpdateTokenMetadataInstructionDataArgs,
  UpdateTokenMetadataInstructionData
> {
  return combineCodec(
    getUpdateTokenMetadataInstructionDataEncoder(),
    getUpdateTokenMetadataInstructionDataDecoder()
  );
}

export type UpdateTokenMetadataInput<
  TAccountVault extends string = string,
  TAccountAdmin extends string = string,
  TAccountMetadata extends string = string,
  TAccountMplTokenMetadataProgram extends string = string,
> = {
  vault: Address<TAccountVault>;
  admin: TransactionSigner<TAccountAdmin>;
  metadata: Address<TAccountMetadata>;
  mplTokenMetadataProgram?: Address<TAccountMplTokenMetadataProgram>;
  name: UpdateTokenMetadataInstructionDataArgs['name'];
  symbol: UpdateTokenMetadataInstructionDataArgs['symbol'];
  uri: UpdateTokenMetadataInstructionDataArgs['uri'];
};

export function getUpdateTokenMetadataInstruction<
  TAccountVault extends string,
  TAccountAdmin extends string,
  TAccountMetadata extends string,
  TAccountMplTokenMetadataProgram extends string,
>(
  input: UpdateTokenMetadataInput<
    TAccountVault,
    TAccountAdmin,
    TAccountMetadata,
    TAccountMplTokenMetadataProgram
  >
): UpdateTokenMetadataInstruction<
  typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountVault,
  TAccountAdmin,
  TAccountMetadata,
  TAccountMplTokenMetadataProgram
> {
  // Program address.
  const programAddress = JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    vault: { value: input.vault ?? null, isWritable: false },
    admin: { value: input.admin ?? null, isWritable: false },
    metadata: { value: input.metadata ?? null, isWritable: true },
    mplTokenMetadataProgram: {
      value: input.mplTokenMetadataProgram ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.mplTokenMetadataProgram.value) {
    accounts.mplTokenMetadataProgram.value =
      'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s' as Address<'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.metadata),
      getAccountMeta(accounts.mplTokenMetadataProgram),
    ],
    programAddress,
    data: getUpdateTokenMetadataInstructionDataEncoder().encode(
      args as UpdateTokenMetadataInstructionDataArgs
    ),
  } as UpdateTokenMetadataInstruction<
    typeof JITO_VAULT_PROGRAM_ADDRESS,
    TAccountVault,
    TAccountAdmin,
    TAccountMetadata,
    TAccountMplTokenMetadataProgram
  >;

  return instruction;
}

export type ParsedUpdateTokenMetadataInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    vault: TAccountMetas[0];
    admin: TAccountMetas[1];
    metadata: TAccountMetas[2];
    mplTokenMetadataProgram: TAccountMetas[3];
  };
  data: UpdateTokenMetadataInstructionData;
};

export function parseUpdateTokenMetadataInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedUpdateTokenMetadataInstruction<TProgram, TAccountMetas> {
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
      vault: getNextAccount(),
      admin: getNextAccount(),
      metadata: getNextAccount(),
      mplTokenMetadataProgram: getNextAccount(),
    },
    data: getUpdateTokenMetadataInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
