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

export type NcnVaultSlasherTicket = {
  discriminator: bigint;
  ncn: Address;
  vault: Address;
  slasher: Address;
  maxSlashablePerEpoch: bigint;
  index: bigint;
  state: SlotToggle;
  bump: number;
  reserved: Array<number>;
};

export type NcnVaultSlasherTicketArgs = {
  discriminator: number | bigint;
  ncn: Address;
  vault: Address;
  slasher: Address;
  maxSlashablePerEpoch: number | bigint;
  index: number | bigint;
  state: SlotToggleArgs;
  bump: number;
  reserved: Array<number>;
};

export function getNcnVaultSlasherTicketEncoder(): Encoder<NcnVaultSlasherTicketArgs> {
  return getStructEncoder([
    ['discriminator', getU64Encoder()],
    ['ncn', getAddressEncoder()],
    ['vault', getAddressEncoder()],
    ['slasher', getAddressEncoder()],
    ['maxSlashablePerEpoch', getU64Encoder()],
    ['index', getU64Encoder()],
    ['state', getSlotToggleEncoder()],
    ['bump', getU8Encoder()],
    ['reserved', getArrayEncoder(getU8Encoder(), { size: 263 })],
  ]);
}

export function getNcnVaultSlasherTicketDecoder(): Decoder<NcnVaultSlasherTicket> {
  return getStructDecoder([
    ['discriminator', getU64Decoder()],
    ['ncn', getAddressDecoder()],
    ['vault', getAddressDecoder()],
    ['slasher', getAddressDecoder()],
    ['maxSlashablePerEpoch', getU64Decoder()],
    ['index', getU64Decoder()],
    ['state', getSlotToggleDecoder()],
    ['bump', getU8Decoder()],
    ['reserved', getArrayDecoder(getU8Decoder(), { size: 263 })],
  ]);
}

export function getNcnVaultSlasherTicketCodec(): Codec<
  NcnVaultSlasherTicketArgs,
  NcnVaultSlasherTicket
> {
  return combineCodec(
    getNcnVaultSlasherTicketEncoder(),
    getNcnVaultSlasherTicketDecoder()
  );
}

export function decodeNcnVaultSlasherTicket<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<NcnVaultSlasherTicket, TAddress>;
export function decodeNcnVaultSlasherTicket<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<NcnVaultSlasherTicket, TAddress>;
export function decodeNcnVaultSlasherTicket<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
):
  | Account<NcnVaultSlasherTicket, TAddress>
  | MaybeAccount<NcnVaultSlasherTicket, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getNcnVaultSlasherTicketDecoder()
  );
}

export async function fetchNcnVaultSlasherTicket<
  TAddress extends string = string,
>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<NcnVaultSlasherTicket, TAddress>> {
  const maybeAccount = await fetchMaybeNcnVaultSlasherTicket(
    rpc,
    address,
    config
  );
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeNcnVaultSlasherTicket<
  TAddress extends string = string,
>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<NcnVaultSlasherTicket, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeNcnVaultSlasherTicket(maybeAccount);
}

export async function fetchAllNcnVaultSlasherTicket(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<NcnVaultSlasherTicket>[]> {
  const maybeAccounts = await fetchAllMaybeNcnVaultSlasherTicket(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeNcnVaultSlasherTicket(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<NcnVaultSlasherTicket>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) =>
    decodeNcnVaultSlasherTicket(maybeAccount)
  );
}

export function getNcnVaultSlasherTicketSize(): number {
  return 424;
}
