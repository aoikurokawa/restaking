/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  getAddressDecoder,
  getAddressEncoder,
  getArrayDecoder,
  getArrayEncoder,
  getBoolDecoder,
  getBoolEncoder,
  getStructDecoder,
  getStructEncoder,
  getU16Decoder,
  getU16Encoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  type Account,
  type Address,
  type Codec,
  type Decoder,
  type EncodedAccount,
  type Encoder,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type MaybeAccount,
  type MaybeEncodedAccount,
} from '@solana/web3.js';
import {
  getDelegationStateDecoder,
  getDelegationStateEncoder,
  type DelegationState,
  type DelegationStateArgs,
} from '../types';

export type Vault = {
  discriminator: bigint;
  base: Address;
  vrtMint: Address;
  supportedMint: Address;
  vrtSupply: bigint;
  tokensDeposited: bigint;
  depositCapacity: bigint;
  delegationState: DelegationState;
  additionalAssetsNeedUnstaking: bigint;
  vrtEnqueuedForCooldownAmount: bigint;
  vrtCoolingDownAmount: bigint;
  vrtReadyToClaimAmount: bigint;
  admin: Address;
  delegationAdmin: Address;
  operatorAdmin: Address;
  ncnAdmin: Address;
  slasherAdmin: Address;
  capacityAdmin: Address;
  feeAdmin: Address;
  delegateAssetAdmin: Address;
  feeWallet: Address;
  mintBurnAdmin: Address;
  metadataAdmin: Address;
  vaultIndex: bigint;
  ncnCount: bigint;
  operatorCount: bigint;
  slasherCount: bigint;
  lastFeeChangeSlot: bigint;
  lastFullStateUpdateSlot: bigint;
  depositFeeBps: number;
  withdrawalFeeBps: number;
  nextWithdrawalFeeBps: number;
  rewardFeeBps: number;
  programFeeBps: number;
  bump: number;
  isPaused: number;
  reserved: Array<number>;
};

export type VaultArgs = {
  discriminator: number | bigint;
  base: Address;
  vrtMint: Address;
  supportedMint: Address;
  vrtSupply: number | bigint;
  tokensDeposited: number | bigint;
  depositCapacity: number | bigint;
  delegationState: DelegationStateArgs;
  additionalAssetsNeedUnstaking: number | bigint;
  vrtEnqueuedForCooldownAmount: number | bigint;
  vrtCoolingDownAmount: number | bigint;
  vrtReadyToClaimAmount: number | bigint;
  admin: Address;
  delegationAdmin: Address;
  operatorAdmin: Address;
  ncnAdmin: Address;
  slasherAdmin: Address;
  capacityAdmin: Address;
  feeAdmin: Address;
  delegateAssetAdmin: Address;
  feeWallet: Address;
  mintBurnAdmin: Address;
  metadataAdmin: Address;
  vaultIndex: number | bigint;
  ncnCount: number | bigint;
  operatorCount: number | bigint;
  slasherCount: number | bigint;
  lastFeeChangeSlot: number | bigint;
  lastFullStateUpdateSlot: number | bigint;
  depositFeeBps: number;
  withdrawalFeeBps: number;
  nextWithdrawalFeeBps: number;
  rewardFeeBps: number;
  programFeeBps: number;
  bump: number;
  isPaused: number;
  reserved: Array<number>;
};

export function getVaultEncoder(): Encoder<VaultArgs> {
  return getStructEncoder([
    ['discriminator', getU64Encoder()],
    ['base', getAddressEncoder()],
    ['vrtMint', getAddressEncoder()],
    ['supportedMint', getAddressEncoder()],
    ['vrtSupply', getU64Encoder()],
    ['tokensDeposited', getU64Encoder()],
    ['depositCapacity', getU64Encoder()],
    ['delegationState', getDelegationStateEncoder()],
    ['additionalAssetsNeedUnstaking', getU64Encoder()],
    ['vrtEnqueuedForCooldownAmount', getU64Encoder()],
    ['vrtCoolingDownAmount', getU64Encoder()],
    ['vrtReadyToClaimAmount', getU64Encoder()],
    ['admin', getAddressEncoder()],
    ['delegationAdmin', getAddressEncoder()],
    ['operatorAdmin', getAddressEncoder()],
    ['ncnAdmin', getAddressEncoder()],
    ['slasherAdmin', getAddressEncoder()],
    ['capacityAdmin', getAddressEncoder()],
    ['feeAdmin', getAddressEncoder()],
    ['delegateAssetAdmin', getAddressEncoder()],
    ['feeWallet', getAddressEncoder()],
    ['mintBurnAdmin', getAddressEncoder()],
    ['metadataAdmin', getAddressEncoder()],
    ['vaultIndex', getU64Encoder()],
    ['ncnCount', getU64Encoder()],
    ['operatorCount', getU64Encoder()],
    ['slasherCount', getU64Encoder()],
    ['lastFeeChangeSlot', getU64Encoder()],
    ['lastFullStateUpdateSlot', getU64Encoder()],
    ['depositFeeBps', getU16Encoder()],
    ['withdrawalFeeBps', getU16Encoder()],
    ['nextWithdrawalFeeBps', getU16Encoder()],
    ['rewardFeeBps', getU16Encoder()],
    ['programFeeBps', getU16Encoder()],
    ['bump', getU8Encoder()],
    ['isPaused', getBoolEncoder()],
    ['reserved', getArrayEncoder(getU8Encoder(), { size: 259 })],
  ]);
}

export function getVaultDecoder(): Decoder<Vault> {
  return getStructDecoder([
    ['discriminator', getU64Decoder()],
    ['base', getAddressDecoder()],
    ['vrtMint', getAddressDecoder()],
    ['supportedMint', getAddressDecoder()],
    ['vrtSupply', getU64Decoder()],
    ['tokensDeposited', getU64Decoder()],
    ['depositCapacity', getU64Decoder()],
    ['delegationState', getDelegationStateDecoder()],
    ['additionalAssetsNeedUnstaking', getU64Decoder()],
    ['vrtEnqueuedForCooldownAmount', getU64Decoder()],
    ['vrtCoolingDownAmount', getU64Decoder()],
    ['vrtReadyToClaimAmount', getU64Decoder()],
    ['admin', getAddressDecoder()],
    ['delegationAdmin', getAddressDecoder()],
    ['operatorAdmin', getAddressDecoder()],
    ['ncnAdmin', getAddressDecoder()],
    ['slasherAdmin', getAddressDecoder()],
    ['capacityAdmin', getAddressDecoder()],
    ['feeAdmin', getAddressDecoder()],
    ['delegateAssetAdmin', getAddressDecoder()],
    ['feeWallet', getAddressDecoder()],
    ['mintBurnAdmin', getAddressDecoder()],
    ['metadataAdmin', getAddressDecoder()],
    ['vaultIndex', getU64Decoder()],
    ['ncnCount', getU64Decoder()],
    ['operatorCount', getU64Decoder()],
    ['slasherCount', getU64Decoder()],
    ['lastFeeChangeSlot', getU64Decoder()],
    ['lastFullStateUpdateSlot', getU64Decoder()],
    ['depositFeeBps', getU16Decoder()],
    ['withdrawalFeeBps', getU16Decoder()],
    ['nextWithdrawalFeeBps', getU16Decoder()],
    ['rewardFeeBps', getU16Decoder()],
    ['programFeeBps', getU16Decoder()],
    ['bump', getU8Decoder()],
    ['isPaused', getBoolDecoder()],
    ['reserved', getArrayDecoder(getU8Decoder(), { size: 259 })],
  ]);
}

export function getVaultCodec(): Codec<VaultArgs, Vault> {
  return combineCodec(getVaultEncoder(), getVaultDecoder());
}

export function decodeVault<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Vault, TAddress>;
export function decodeVault<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Vault, TAddress>;
export function decodeVault<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Vault, TAddress> | MaybeAccount<Vault, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getVaultDecoder()
  );
}

export async function fetchVault<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Vault, TAddress>> {
  const maybeAccount = await fetchMaybeVault(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeVault<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Vault, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeVault(maybeAccount);
}

export async function fetchAllVault(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Vault>[]> {
  const maybeAccounts = await fetchAllMaybeVault(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeVault(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Vault>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeVault(maybeAccount));
}
