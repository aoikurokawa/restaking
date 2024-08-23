/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
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

export type Config = {
  discriminator: bigint;
  admin: Address;
  restakingProgram: Address;
  epochLength: bigint;
  numVaults: bigint;
  feeCapBps: number;
  feeRateOfChangeBps: number;
  feeBumpBps: number;
  bump: number;
  reserved: Array<number>;
};

export type ConfigArgs = {
  discriminator: number | bigint;
  admin: Address;
  restakingProgram: Address;
  epochLength: number | bigint;
  numVaults: number | bigint;
  feeCapBps: number;
  feeRateOfChangeBps: number;
  feeBumpBps: number;
  bump: number;
  reserved: Array<number>;
};

export function getConfigEncoder(): Encoder<ConfigArgs> {
  return getStructEncoder([
    ['discriminator', getU64Encoder()],
    ['admin', getAddressEncoder()],
    ['restakingProgram', getAddressEncoder()],
    ['epochLength', getU64Encoder()],
    ['numVaults', getU64Encoder()],
    ['feeCapBps', getU16Encoder()],
    ['feeRateOfChangeBps', getU16Encoder()],
    ['feeBumpBps', getU16Encoder()],
    ['bump', getU8Encoder()],
    ['reserved', getArrayEncoder(getU8Encoder(), { size: 17 })],
  ]);
}

export function getConfigDecoder(): Decoder<Config> {
  return getStructDecoder([
    ['discriminator', getU64Decoder()],
    ['admin', getAddressDecoder()],
    ['restakingProgram', getAddressDecoder()],
    ['epochLength', getU64Decoder()],
    ['numVaults', getU64Decoder()],
    ['feeCapBps', getU16Decoder()],
    ['feeRateOfChangeBps', getU16Decoder()],
    ['feeBumpBps', getU16Decoder()],
    ['bump', getU8Decoder()],
    ['reserved', getArrayDecoder(getU8Decoder(), { size: 17 })],
  ]);
}

export function getConfigCodec(): Codec<ConfigArgs, Config> {
  return combineCodec(getConfigEncoder(), getConfigDecoder());
}

export function decodeConfig<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<Config, TAddress>;
export function decodeConfig<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<Config, TAddress>;
export function decodeConfig<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<Config, TAddress> | MaybeAccount<Config, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getConfigDecoder()
  );
}

export async function fetchConfig<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<Config, TAddress>> {
  const maybeAccount = await fetchMaybeConfig(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeConfig<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<Config, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeConfig(maybeAccount);
}

export async function fetchAllConfig(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<Config>[]> {
  const maybeAccounts = await fetchAllMaybeConfig(rpc, addresses, config);
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeConfig(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<Config>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) => decodeConfig(maybeAccount));
}
