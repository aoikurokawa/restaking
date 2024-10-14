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
} from '@solana/web3.js';
import { JITO_RESTAKING_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_NCN_VAULT_TICKET_DISCRIMINATOR = 4;

export function getInitializeNcnVaultTicketDiscriminatorBytes() {
  return getU8Encoder().encode(INITIALIZE_NCN_VAULT_TICKET_DISCRIMINATOR);
}

export type InitializeNcnVaultTicketInstruction<
  TProgram extends string = typeof JITO_RESTAKING_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountNcn extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountNcnVaultTicket extends string | IAccountMeta<string> = string,
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
      TAccountNcn extends string ? WritableAccount<TAccountNcn> : TAccountNcn,
      TAccountVault extends string
        ? ReadonlyAccount<TAccountVault>
        : TAccountVault,
      TAccountNcnVaultTicket extends string
        ? WritableAccount<TAccountNcnVaultTicket>
        : TAccountNcnVaultTicket,
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

export type InitializeNcnVaultTicketInstructionData = { discriminator: number };

export type InitializeNcnVaultTicketInstructionDataArgs = {};

export function getInitializeNcnVaultTicketInstructionDataEncoder(): Encoder<InitializeNcnVaultTicketInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({
      ...value,
      discriminator: INITIALIZE_NCN_VAULT_TICKET_DISCRIMINATOR,
    })
  );
}

export function getInitializeNcnVaultTicketInstructionDataDecoder(): Decoder<InitializeNcnVaultTicketInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getInitializeNcnVaultTicketInstructionDataCodec(): Codec<
  InitializeNcnVaultTicketInstructionDataArgs,
  InitializeNcnVaultTicketInstructionData
> {
  return combineCodec(
    getInitializeNcnVaultTicketInstructionDataEncoder(),
    getInitializeNcnVaultTicketInstructionDataDecoder()
  );
}

export type InitializeNcnVaultTicketInput<
  TAccountConfig extends string = string,
  TAccountNcn extends string = string,
  TAccountVault extends string = string,
  TAccountNcnVaultTicket extends string = string,
  TAccountAdmin extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
> = {
  config: Address<TAccountConfig>;
  ncn: Address<TAccountNcn>;
  vault: Address<TAccountVault>;
  ncnVaultTicket: Address<TAccountNcnVaultTicket>;
  admin: TransactionSigner<TAccountAdmin>;
  payer: TransactionSigner<TAccountPayer>;
  systemProgram?: Address<TAccountSystemProgram>;
};

export function getInitializeNcnVaultTicketInstruction<
  TAccountConfig extends string,
  TAccountNcn extends string,
  TAccountVault extends string,
  TAccountNcnVaultTicket extends string,
  TAccountAdmin extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
>(
  input: InitializeNcnVaultTicketInput<
    TAccountConfig,
    TAccountNcn,
    TAccountVault,
    TAccountNcnVaultTicket,
    TAccountAdmin,
    TAccountPayer,
    TAccountSystemProgram
  >
): InitializeNcnVaultTicketInstruction<
  typeof JITO_RESTAKING_PROGRAM_ADDRESS,
  TAccountConfig,
  TAccountNcn,
  TAccountVault,
  TAccountNcnVaultTicket,
  TAccountAdmin,
  TAccountPayer,
  TAccountSystemProgram
> {
  // Program address.
  const programAddress = JITO_RESTAKING_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    ncn: { value: input.ncn ?? null, isWritable: true },
    vault: { value: input.vault ?? null, isWritable: false },
    ncnVaultTicket: { value: input.ncnVaultTicket ?? null, isWritable: true },
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
      getAccountMeta(accounts.ncn),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.ncnVaultTicket),
      getAccountMeta(accounts.admin),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
    ],
    programAddress,
    data: getInitializeNcnVaultTicketInstructionDataEncoder().encode({}),
  } as InitializeNcnVaultTicketInstruction<
    typeof JITO_RESTAKING_PROGRAM_ADDRESS,
    TAccountConfig,
    TAccountNcn,
    TAccountVault,
    TAccountNcnVaultTicket,
    TAccountAdmin,
    TAccountPayer,
    TAccountSystemProgram
  >;

  return instruction;
}

export type ParsedInitializeNcnVaultTicketInstruction<
  TProgram extends string = typeof JITO_RESTAKING_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    ncn: TAccountMetas[1];
    vault: TAccountMetas[2];
    ncnVaultTicket: TAccountMetas[3];
    admin: TAccountMetas[4];
    payer: TAccountMetas[5];
    systemProgram: TAccountMetas[6];
  };
  data: InitializeNcnVaultTicketInstructionData;
};

export function parseInitializeNcnVaultTicketInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeNcnVaultTicketInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
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
      ncn: getNextAccount(),
      vault: getNextAccount(),
      ncnVaultTicket: getNextAccount(),
      admin: getNextAccount(),
      payer: getNextAccount(),
      systemProgram: getNextAccount(),
    },
    data: getInitializeNcnVaultTicketInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
