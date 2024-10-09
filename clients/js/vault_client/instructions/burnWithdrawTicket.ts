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
} from '@solana/web3.js';
import { JITO_VAULT_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const BURN_WITHDRAW_TICKET_DISCRIMINATOR = 15;

export function getBurnWithdrawTicketDiscriminatorBytes() {
  return getU8Encoder().encode(BURN_WITHDRAW_TICKET_DISCRIMINATOR);
}

export type BurnWithdrawTicketInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountConfig extends string | IAccountMeta<string> = string,
  TAccountVault extends string | IAccountMeta<string> = string,
  TAccountVaultTokenAccount extends string | IAccountMeta<string> = string,
  TAccountVrtMint extends string | IAccountMeta<string> = string,
  TAccountStaker extends string | IAccountMeta<string> = string,
  TAccountStakerTokenAccount extends string | IAccountMeta<string> = string,
  TAccountVaultStakerWithdrawalTicket extends
    | string
    | IAccountMeta<string> = string,
  TAccountVaultStakerWithdrawalTicketTokenAccount extends
    | string
    | IAccountMeta<string> = string,
  TAccountVaultFeeTokenAccount extends string | IAccountMeta<string> = string,
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
      TAccountVaultTokenAccount extends string
        ? WritableAccount<TAccountVaultTokenAccount>
        : TAccountVaultTokenAccount,
      TAccountVrtMint extends string
        ? WritableAccount<TAccountVrtMint>
        : TAccountVrtMint,
      TAccountStaker extends string
        ? WritableAccount<TAccountStaker>
        : TAccountStaker,
      TAccountStakerTokenAccount extends string
        ? WritableAccount<TAccountStakerTokenAccount>
        : TAccountStakerTokenAccount,
      TAccountVaultStakerWithdrawalTicket extends string
        ? WritableAccount<TAccountVaultStakerWithdrawalTicket>
        : TAccountVaultStakerWithdrawalTicket,
      TAccountVaultStakerWithdrawalTicketTokenAccount extends string
        ? WritableAccount<TAccountVaultStakerWithdrawalTicketTokenAccount>
        : TAccountVaultStakerWithdrawalTicketTokenAccount,
      TAccountVaultFeeTokenAccount extends string
        ? WritableAccount<TAccountVaultFeeTokenAccount>
        : TAccountVaultFeeTokenAccount,
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

export type BurnWithdrawTicketInstructionData = {
  discriminator: number;
  minAmountOut: bigint;
};

export type BurnWithdrawTicketInstructionDataArgs = {
  minAmountOut: number | bigint;
};

export function getBurnWithdrawTicketInstructionDataEncoder(): Encoder<BurnWithdrawTicketInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['minAmountOut', getU64Encoder()],
    ]),
    (value) => ({ ...value, discriminator: BURN_WITHDRAW_TICKET_DISCRIMINATOR })
  );
}

export function getBurnWithdrawTicketInstructionDataDecoder(): Decoder<BurnWithdrawTicketInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['minAmountOut', getU64Decoder()],
  ]);
}

export function getBurnWithdrawTicketInstructionDataCodec(): Codec<
  BurnWithdrawTicketInstructionDataArgs,
  BurnWithdrawTicketInstructionData
> {
  return combineCodec(
    getBurnWithdrawTicketInstructionDataEncoder(),
    getBurnWithdrawTicketInstructionDataDecoder()
  );
}

export type BurnWithdrawTicketInput<
  TAccountConfig extends string = string,
  TAccountVault extends string = string,
  TAccountVaultTokenAccount extends string = string,
  TAccountVrtMint extends string = string,
  TAccountStaker extends string = string,
  TAccountStakerTokenAccount extends string = string,
  TAccountVaultStakerWithdrawalTicket extends string = string,
  TAccountVaultStakerWithdrawalTicketTokenAccount extends string = string,
  TAccountVaultFeeTokenAccount extends string = string,
  TAccountTokenProgram extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountBurnSigner extends string = string,
> = {
  config: Address<TAccountConfig>;
  vault: Address<TAccountVault>;
  vaultTokenAccount: Address<TAccountVaultTokenAccount>;
  vrtMint: Address<TAccountVrtMint>;
  staker: Address<TAccountStaker>;
  stakerTokenAccount: Address<TAccountStakerTokenAccount>;
  vaultStakerWithdrawalTicket: Address<TAccountVaultStakerWithdrawalTicket>;
  vaultStakerWithdrawalTicketTokenAccount: Address<TAccountVaultStakerWithdrawalTicketTokenAccount>;
  vaultFeeTokenAccount: Address<TAccountVaultFeeTokenAccount>;
  tokenProgram?: Address<TAccountTokenProgram>;
  systemProgram?: Address<TAccountSystemProgram>;
  /** Signer for burning */
  burnSigner?: TransactionSigner<TAccountBurnSigner>;
  minAmountOut: BurnWithdrawTicketInstructionDataArgs['minAmountOut'];
};

export function getBurnWithdrawTicketInstruction<
  TAccountConfig extends string,
  TAccountVault extends string,
  TAccountVaultTokenAccount extends string,
  TAccountVrtMint extends string,
  TAccountStaker extends string,
  TAccountStakerTokenAccount extends string,
  TAccountVaultStakerWithdrawalTicket extends string,
  TAccountVaultStakerWithdrawalTicketTokenAccount extends string,
  TAccountVaultFeeTokenAccount extends string,
  TAccountTokenProgram extends string,
  TAccountSystemProgram extends string,
  TAccountBurnSigner extends string,
  TProgramAddress extends Address = typeof JITO_VAULT_PROGRAM_ADDRESS,
>(
  input: BurnWithdrawTicketInput<
    TAccountConfig,
    TAccountVault,
    TAccountVaultTokenAccount,
    TAccountVrtMint,
    TAccountStaker,
    TAccountStakerTokenAccount,
    TAccountVaultStakerWithdrawalTicket,
    TAccountVaultStakerWithdrawalTicketTokenAccount,
    TAccountVaultFeeTokenAccount,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountBurnSigner
  >,
  config?: { programAddress?: TProgramAddress }
): BurnWithdrawTicketInstruction<
  TProgramAddress,
  TAccountConfig,
  TAccountVault,
  TAccountVaultTokenAccount,
  TAccountVrtMint,
  TAccountStaker,
  TAccountStakerTokenAccount,
  TAccountVaultStakerWithdrawalTicket,
  TAccountVaultStakerWithdrawalTicketTokenAccount,
  TAccountVaultFeeTokenAccount,
  TAccountTokenProgram,
  TAccountSystemProgram,
  TAccountBurnSigner
> {
  // Program address.
  const programAddress = config?.programAddress ?? JITO_VAULT_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    config: { value: input.config ?? null, isWritable: false },
    vault: { value: input.vault ?? null, isWritable: true },
    vaultTokenAccount: {
      value: input.vaultTokenAccount ?? null,
      isWritable: true,
    },
    vrtMint: { value: input.vrtMint ?? null, isWritable: true },
    staker: { value: input.staker ?? null, isWritable: true },
    stakerTokenAccount: {
      value: input.stakerTokenAccount ?? null,
      isWritable: true,
    },
    vaultStakerWithdrawalTicket: {
      value: input.vaultStakerWithdrawalTicket ?? null,
      isWritable: true,
    },
    vaultStakerWithdrawalTicketTokenAccount: {
      value: input.vaultStakerWithdrawalTicketTokenAccount ?? null,
      isWritable: true,
    },
    vaultFeeTokenAccount: {
      value: input.vaultFeeTokenAccount ?? null,
      isWritable: true,
    },
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
      getAccountMeta(accounts.vaultTokenAccount),
      getAccountMeta(accounts.vrtMint),
      getAccountMeta(accounts.staker),
      getAccountMeta(accounts.stakerTokenAccount),
      getAccountMeta(accounts.vaultStakerWithdrawalTicket),
      getAccountMeta(accounts.vaultStakerWithdrawalTicketTokenAccount),
      getAccountMeta(accounts.vaultFeeTokenAccount),
      getAccountMeta(accounts.tokenProgram),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.burnSigner),
    ],
    programAddress,
    data: getBurnWithdrawTicketInstructionDataEncoder().encode(
      args as BurnWithdrawTicketInstructionDataArgs
    ),
  } as BurnWithdrawTicketInstruction<
    TProgramAddress,
    TAccountConfig,
    TAccountVault,
    TAccountVaultTokenAccount,
    TAccountVrtMint,
    TAccountStaker,
    TAccountStakerTokenAccount,
    TAccountVaultStakerWithdrawalTicket,
    TAccountVaultStakerWithdrawalTicketTokenAccount,
    TAccountVaultFeeTokenAccount,
    TAccountTokenProgram,
    TAccountSystemProgram,
    TAccountBurnSigner
  >;

  return instruction;
}

export type ParsedBurnWithdrawTicketInstruction<
  TProgram extends string = typeof JITO_VAULT_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    config: TAccountMetas[0];
    vault: TAccountMetas[1];
    vaultTokenAccount: TAccountMetas[2];
    vrtMint: TAccountMetas[3];
    staker: TAccountMetas[4];
    stakerTokenAccount: TAccountMetas[5];
    vaultStakerWithdrawalTicket: TAccountMetas[6];
    vaultStakerWithdrawalTicketTokenAccount: TAccountMetas[7];
    vaultFeeTokenAccount: TAccountMetas[8];
    tokenProgram: TAccountMetas[9];
    systemProgram: TAccountMetas[10];
    /** Signer for burning */
    burnSigner?: TAccountMetas[11] | undefined;
  };
  data: BurnWithdrawTicketInstructionData;
};

export function parseBurnWithdrawTicketInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedBurnWithdrawTicketInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 12) {
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
      vaultTokenAccount: getNextAccount(),
      vrtMint: getNextAccount(),
      staker: getNextAccount(),
      stakerTokenAccount: getNextAccount(),
      vaultStakerWithdrawalTicket: getNextAccount(),
      vaultStakerWithdrawalTicketTokenAccount: getNextAccount(),
      vaultFeeTokenAccount: getNextAccount(),
      tokenProgram: getNextAccount(),
      systemProgram: getNextAccount(),
      burnSigner: getNextOptionalAccount(),
    },
    data: getBurnWithdrawTicketInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
