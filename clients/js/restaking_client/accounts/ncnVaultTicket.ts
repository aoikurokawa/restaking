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
  getStructDecoder,
  getStructEncoder,
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
  getSlotToggleDecoder,
  getSlotToggleEncoder,
  type SlotToggle,
  type SlotToggleArgs,
} from '../types';

export type NcnVaultTicket = {
  discriminator: bigint;
  ncn: Address;
  vault: Address;
  index: bigint;
  state: SlotToggle;
  bump: number;
  reserved: Array<number>;
};

export type NcnVaultTicketArgs = {
  discriminator: number | bigint;
  ncn: Address;
  vault: Address;
  index: number | bigint;
  state: SlotToggleArgs;
  bump: number;
  reserved: Array<number>;
};

export function getNcnVaultTicketEncoder(): Encoder<NcnVaultTicketArgs> {
  return getStructEncoder([
    ['discriminator', getU64Encoder()],
    ['ncn', getAddressEncoder()],
    ['vault', getAddressEncoder()],
    ['index', getU64Encoder()],
    ['state', getSlotToggleEncoder()],
    ['bump', getU8Encoder()],
    ['reserved', getArrayEncoder(getU8Encoder(), { size: 263 })],
  ]);
}

export function getNcnVaultTicketDecoder(): Decoder<NcnVaultTicket> {
  return getStructDecoder([
    ['discriminator', getU64Decoder()],
    ['ncn', getAddressDecoder()],
    ['vault', getAddressDecoder()],
    ['index', getU64Decoder()],
    ['state', getSlotToggleDecoder()],
    ['bump', getU8Decoder()],
    ['reserved', getArrayDecoder(getU8Decoder(), { size: 263 })],
  ]);
}

export function getNcnVaultTicketCodec(): Codec<
  NcnVaultTicketArgs,
  NcnVaultTicket
> {
  return combineCodec(getNcnVaultTicketEncoder(), getNcnVaultTicketDecoder());
}

export function decodeNcnVaultTicket<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<NcnVaultTicket, TAddress>;
export function decodeNcnVaultTicket<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<NcnVaultTicket, TAddress>;
export function decodeNcnVaultTicket<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
): Account<NcnVaultTicket, TAddress> | MaybeAccount<NcnVaultTicket, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getNcnVaultTicketDecoder()
  );
}

export async function fetchNcnVaultTicket<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<NcnVaultTicket, TAddress>> {
  const maybeAccount = await fetchMaybeNcnVaultTicket(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeNcnVaultTicket<
  TAddress extends string = string,
>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<NcnVaultTicket, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeNcnVaultTicket(maybeAccount);
}

export async function fetchAllNcnVaultTicket(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<NcnVaultTicket>[]> {
  const maybeAccounts = await fetchAllMaybeNcnVaultTicket(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeNcnVaultTicket(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<NcnVaultTicket>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) =>
    decodeNcnVaultTicket(maybeAccount)
  );
}
