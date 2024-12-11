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

export type NcnOperatorState = {
  discriminator: bigint;
  ncn: Address;
  operator: Address;
  index: bigint;
  ncnOptInState: SlotToggle;
  operatorOptInState: SlotToggle;
  bump: number;
  reserved: Array<number>;
};

export type NcnOperatorStateArgs = {
  discriminator: number | bigint;
  ncn: Address;
  operator: Address;
  index: number | bigint;
  ncnOptInState: SlotToggleArgs;
  operatorOptInState: SlotToggleArgs;
  bump: number;
  reserved: Array<number>;
};

export function getNcnOperatorStateEncoder(): Encoder<NcnOperatorStateArgs> {
  return getStructEncoder([
    ['discriminator', getU64Encoder()],
    ['ncn', getAddressEncoder()],
    ['operator', getAddressEncoder()],
    ['index', getU64Encoder()],
    ['ncnOptInState', getSlotToggleEncoder()],
    ['operatorOptInState', getSlotToggleEncoder()],
    ['bump', getU8Encoder()],
    ['reserved', getArrayEncoder(getU8Encoder(), { size: 263 })],
  ]);
}

export function getNcnOperatorStateDecoder(): Decoder<NcnOperatorState> {
  return getStructDecoder([
    ['discriminator', getU64Decoder()],
    ['ncn', getAddressDecoder()],
    ['operator', getAddressDecoder()],
    ['index', getU64Decoder()],
    ['ncnOptInState', getSlotToggleDecoder()],
    ['operatorOptInState', getSlotToggleDecoder()],
    ['bump', getU8Decoder()],
    ['reserved', getArrayDecoder(getU8Decoder(), { size: 263 })],
  ]);
}

export function getNcnOperatorStateCodec(): Codec<
  NcnOperatorStateArgs,
  NcnOperatorState
> {
  return combineCodec(
    getNcnOperatorStateEncoder(),
    getNcnOperatorStateDecoder()
  );
}

export function decodeNcnOperatorState<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>
): Account<NcnOperatorState, TAddress>;
export function decodeNcnOperatorState<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>
): MaybeAccount<NcnOperatorState, TAddress>;
export function decodeNcnOperatorState<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>
):
  | Account<NcnOperatorState, TAddress>
  | MaybeAccount<NcnOperatorState, TAddress> {
  return decodeAccount(
    encodedAccount as MaybeEncodedAccount<TAddress>,
    getNcnOperatorStateDecoder()
  );
}

export async function fetchNcnOperatorState<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<Account<NcnOperatorState, TAddress>> {
  const maybeAccount = await fetchMaybeNcnOperatorState(rpc, address, config);
  assertAccountExists(maybeAccount);
  return maybeAccount;
}

export async function fetchMaybeNcnOperatorState<
  TAddress extends string = string,
>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig
): Promise<MaybeAccount<NcnOperatorState, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config);
  return decodeNcnOperatorState(maybeAccount);
}

export async function fetchAllNcnOperatorState(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<Account<NcnOperatorState>[]> {
  const maybeAccounts = await fetchAllMaybeNcnOperatorState(
    rpc,
    addresses,
    config
  );
  assertAccountsExist(maybeAccounts);
  return maybeAccounts;
}

export async function fetchAllMaybeNcnOperatorState(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig
): Promise<MaybeAccount<NcnOperatorState>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config);
  return maybeAccounts.map((maybeAccount) =>
    decodeNcnOperatorState(maybeAccount)
  );
}
