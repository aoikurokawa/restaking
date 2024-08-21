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
  getU64Decoder,
  getU64Encoder,
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
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const ENQUEUE_WITHDRAWAL_DISCRIMINATOR = 13;

export function getEnqueueWithdrawalDiscriminatorBytes() {
  return getU8Encoder().encode(ENQUEUE_WITHDRAWAL_DISCRIMINATOR);
}

export type EnqueueWithdrawalInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountVaultStakerWithdrawalTicket extends
    | string
    | IAccountMeta<string> = string,
  TAccountVaultStakerWithdrawalTicketTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountStaker extends string | IAccountMeta<string> = string,
  TAccountStakerVrtTokenAccount extends string | IAccountMeta<string> = string,
  TAccountBase extends string | IAccountMeta<string> = string,
  TAccountTokenProgram extends
    | string
    | IAccountMeta<string> = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
  TAccountSystemProgram extends
    | string
    | IAccountMeta<string> = '11111111111111111111111111111111',
  TAccountBurnSigner extends string | IAccountMeta<string> = string,
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
      TAccountVaultStakerWithdrawalTicket extends string
        ? WritableAccount<TAccountVaultStakerWithdrawalTicket>
        : TAccountVaultStakerWithdrawalTicket,
      TAccountVaultStakerWithdrawalTicketTokenAccount extends string
        ? WritableAccount<TAccountVaultStakerWithdrawalTicketTokenAccount>
        : TAccountVaultStakerWithdrawalTicketTokenAccount,
      TAccountStaker extends string
        ? WritableSignerAccount<TAccountStaker> &
            IAccountSignerMeta<TAccountStaker>
        : TAccountStaker,
      TAccountStakerVrtTokenAccount extends string
        ? WritableAccount<TAccountStakerVrtTokenAccount>
        : TAccountStakerVrtTokenAccount,
      TAccountBase extends string
        ? ReadonlySignerAccount<TAccountBase> & IAccountSignerMeta<TAccountBase>
        : TAccountBase,
      TAccountTokenProgram extends string
        ? ReadonlyAccount<TAccountTokenProgram>
        : TAccountTokenProgram,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountBurnSigner extends string
        ? ReadonlySignerAccount<TAccountBurnSigner> &
            IAccountSignerMeta<TAccountBurnSigner>
        : TAccountBurnSigner,
      ...TRemainingAccounts,
    ]
  >;

export type EnqueueWithdrawalInstructionData = {
  discriminator: number;
  amount: bigint;
};

export type EnqueueWithdrawalInstructionDataArgs = { amount: number | bigint };

export function getEnqueueWithdrawalInstructionDataEncoder(): Encoder<EnqueueWithdrawalInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: ENQUEUE_WITHDRAWAL_DISCRIMINATOR })
  );
}

export function getEnqueueWithdrawalInstructionDataDecoder(): Decoder<EnqueueWithdrawalInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
  ]);
}

export function getEnqueueWithdrawalInstructionDataCodec(): Codec<
  EnqueueWithdrawalInstructionDataArgs,
  EnqueueWithdrawalInstructionData
> {
  return combineCodec(
    getEnqueueWithdrawalInstructionDataEncoder(),
    getEnqueueWithdrawalInstructionDataDecoder()
  );
}

export type EnqueueWithdrawalInput<
  TAccountConfig extends string = string,
  TAccountVault extends string = string,
  TAccountVaultStakerWithdrawalTicket extends string = string,
  TAccountVaultStakerWithdrawalTicketTokenAccount extends string = string,
  TAccountStaker extends string = string,
  TAccountStakerVrtTokenAccount extends string = string,
  TAccountBase extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountBurnSigner extends string = string,
> = {
  config: Address<TAccountConfig>;
  vault: Address<TAccountVault>;
  vaultStakerWithdrawalTicket: Address<TAccountVaultStakerWithdrawalTicket>;
  vaultStakerWithdrawalTicketTokenAccount: Address<TAccountVaultStakerWithdrawalTicketTokenAccount>;
  staker: TransactionSigner<TAccountStaker>;
  stakerVrtTokenAccount: Address<TAccountStakerVrtTokenAccount>;
  base: TransactionSigner<TAccountBase>;
  tokenProgram?: Address<TAccountTokenProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  /** Signer for burning */
  burnSigner?: TransactionSigner<TAccountBurnSigner>;
  amount: EnqueueWithdrawalInstructionDataArgs['amount'];
};

export function getEnqueueWithdrawalInstruction<
  TAccountConfig extends string,
  TAccountVault extends string,
  TAccountVaultStakerWithdrawalTicket extends string,
  TAccountVaultStakerWithdrawalTicketTokenAccount extends string,
  TAccountStaker extends string,
  TAccountStakerVrtTokenAccount extends string,
  TAccountBase extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountBurnSigner extends string,
>(
  input: EnqueueWithdrawalInput<
    TAccountConfig,
    TAccountVault,
    TAccountVaultStakerWithdrawalTicket,
    TAccountVaultStakerWithdrawalTicketTokenAccount,
    TAccountStaker,
    TAccountStakerVrtTokenAccount,
    TAccountBase,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountBurnSigner
  >
): EnqueueWithdrawalInstruction<
  typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig,
  TAccountVault,
  TAccountVaultStakerWithdrawalTicket,
  TAccountVaultStakerWithdrawalTicketTokenAccount,
  TAccountStaker,
  TAccountStakerVrtTokenAccount,
  TAccountBase,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountBurnSigner
> {
  // Program address.
  const programAddress = JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    vaultStakerWithdrawalTicket: {
      value: input.vaultStakerWithdrawalTicket ?? null,
      isWritable: true,
    },
    vaultStakerWithdrawalTicketTokenAccount: {
      value: input.vaultStakerWithdrawalTicketTokenAccount ?? null,
      isWritable: true,
    },
    staker: { value: input.staker ?? null, isWritable: true },
    stakerVrtTokenAccount: {
      value: input.stakerVrtTokenAccount ?? null,
      isWritable: true,
    },
    base: { value: input.base ?? null, isWritable: false },
    tokenProgram: { value: input.tokenProgram ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    burnSigner: { value: input.burnSigner ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.tokenProgram.value) {
    accounts.tokenProgram.value =
      'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' as Address<'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'>;
  }
  if (!accounts.systemProgram.value) {
    accounts.systemProgram.value =
      '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.config),
      getAccountMeta(accounts.vault),
      getAccountMeta(accounts.vaultStakerWithdrawalTicket),
      getAccountMeta(accounts.vaultStakerWithdrawalTicketTokenAccount),
      getAccountMeta(accounts.staker),
      getAccountMeta(accounts.stakerVrtTokenAccount),
      getAccountMeta(accounts.base),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.burnSigner),
    ],
    programAddress,
    data: getEnqueueWithdrawalInstructionDataEncoder().encode(
      args as EnqueueWithdrawalInstructionDataArgs
    ),
  } as EnqueueWithdrawalInstruction<
    typeof JITO_VAULT_PROGRAM_ADDRESS,
    TAccountConfig,
    TAccountVault,
    TAccountVaultStakerWithdrawalTicket,
    TAccountVaultStakerWithdrawalTicketTokenAccount,
    TAccountStaker,
    TAccountStakerVrtTokenAccount,
    TAccountBase,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountBurnSigner
  >;

  return instruction;
}

export type ParsedEnqueueWithdrawalInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    vault: TAccountMetas[1];
    vaultStakerWithdrawalTicket: TAccountMetas[2];
    vaultStakerWithdrawalTicketTokenAccount: TAccountMetas[3];
    staker: TAccountMetas[4];
    stakerVrtTokenAccount: TAccountMetas[5];
    base: TAccountMetas[6];
    tokenProgram: TAccountMetas[7];
    systemProgram: TAccountMetas[8];
    /** Signer for burning */
    burnSigner?: TAccountMetas[9] | undefined;
  };
  data: EnqueueWithdrawalInstructionData;
};

export function parseEnqueueWithdrawalInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedEnqueueWithdrawalInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 10) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === JITO_VAULT_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      config: getNextAccount(),
      vault: getNextAccount(),
      vaultStakerWithdrawalTicket: getNextAccount(),
      vaultStakerWithdrawalTicketTokenAccount: getNextAccount(),
      staker: getNextAccount(),
      stakerVrtTokenAccount: getNextAccount(),
      base: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      burnSigner: getNextOptionalAccount(),
    },
    data: getEnqueueWithdrawalInstructionDataDecoder().decode(instruction.data),
  };
}
