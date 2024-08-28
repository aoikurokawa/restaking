/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/kinobi-so/kinobi
 */

import {
  containsBytes,
  getU8Encoder,
  type Address,
  type ReadonlyUint8Array,
} from '@solana/web3.js';
import {
  type ParsedCooldownNcnVaultSlasherTicketInstruction,
  type ParsedCooldownNcnVaultTicketInstruction,
  type ParsedCooldownOperatorVaultTicketInstruction,
  type ParsedInitializeConfigInstruction,
  type ParsedInitializeNcnInstruction,
  type ParsedInitializeNcnOperatorStateInstruction,
  type ParsedInitializeNcnVaultSlasherTicketInstruction,
  type ParsedInitializeNcnVaultTicketInstruction,
  type ParsedInitializeOperatorInstruction,
  type ParsedInitializeOperatorVaultTicketInstruction,
  type ParsedNcnCooldownOperatorInstruction,
  type ParsedNcnDelegateTokenAccountInstruction,
  type ParsedNcnSetAdminInstruction,
  type ParsedNcnSetSecondaryAdminInstruction,
  type ParsedNcnWarmupOperatorInstruction,
  type ParsedOperatorCooldownNcnInstruction,
  type ParsedOperatorDelegateTokenAccountInstruction,
  type ParsedOperatorSetAdminInstruction,
  type ParsedOperatorSetSecondaryAdminInstruction,
  type ParsedOperatorWarmupNcnInstruction,
  type ParsedWarmupNcnVaultSlasherTicketInstruction,
  type ParsedWarmupNcnVaultTicketInstruction,
  type ParsedWarmupOperatorVaultTicketInstruction,
} from '../instructions';

export const JITO_RESTAKING_PROGRAM_ADDRESS =
  '2gYZ1xHgydtzqfRuwvoL5oZmJzRo6TDQJNjuf2fARouZ' as Address<'2gYZ1xHgydtzqfRuwvoL5oZmJzRo6TDQJNjuf2fARouZ'>;

export enum JitoRestakingAccount {
  Config,
  Ncn,
  NcnOperatorState,
  NcnVaultSlasherTicket,
  NcnVaultTicket,
  Operator,
  OperatorVaultTicket,
}

export enum JitoRestakingInstruction {
  InitializeConfig,
  InitializeNcn,
  InitializeOperator,
  InitializeNcnVaultSlasherTicket,
  InitializeNcnVaultTicket,
  InitializeOperatorVaultTicket,
  InitializeNcnOperatorState,
  WarmupNcnVaultTicket,
  CooldownNcnVaultTicket,
  NcnWarmupOperator,
  NcnCooldownOperator,
  OperatorWarmupNcn,
  OperatorCooldownNcn,
  WarmupNcnVaultSlasherTicket,
  CooldownNcnVaultSlasherTicket,
  WarmupOperatorVaultTicket,
  CooldownOperatorVaultTicket,
  NcnSetAdmin,
  NcnSetSecondaryAdmin,
  OperatorSetAdmin,
  OperatorSetSecondaryAdmin,
  NcnDelegateTokenAccount,
  OperatorDelegateTokenAccount,
}

export function identifyJitoRestakingInstruction(
  instruction: { data: ReadonlyUint8Array } | ReadonlyUint8Array
): JitoRestakingInstruction {
  const data = 'data' in instruction ? instruction.data : instruction;
  if (containsBytes(data, getU8Encoder().encode(0), 0)) {
    return JitoRestakingInstruction.InitializeConfig;
  }
  if (containsBytes(data, getU8Encoder().encode(1), 0)) {
    return JitoRestakingInstruction.InitializeNcn;
  }
  if (containsBytes(data, getU8Encoder().encode(2), 0)) {
    return JitoRestakingInstruction.InitializeOperator;
  }
  if (containsBytes(data, getU8Encoder().encode(3), 0)) {
    return JitoRestakingInstruction.InitializeNcnVaultSlasherTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(4), 0)) {
    return JitoRestakingInstruction.InitializeNcnVaultTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(5), 0)) {
    return JitoRestakingInstruction.InitializeOperatorVaultTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(6), 0)) {
    return JitoRestakingInstruction.InitializeNcnOperatorState;
  }
  if (containsBytes(data, getU8Encoder().encode(7), 0)) {
    return JitoRestakingInstruction.WarmupNcnVaultTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(8), 0)) {
    return JitoRestakingInstruction.CooldownNcnVaultTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(9), 0)) {
    return JitoRestakingInstruction.NcnWarmupOperator;
  }
  if (containsBytes(data, getU8Encoder().encode(10), 0)) {
    return JitoRestakingInstruction.NcnCooldownOperator;
  }
  if (containsBytes(data, getU8Encoder().encode(11), 0)) {
    return JitoRestakingInstruction.OperatorWarmupNcn;
  }
  if (containsBytes(data, getU8Encoder().encode(12), 0)) {
    return JitoRestakingInstruction.OperatorCooldownNcn;
  }
  if (containsBytes(data, getU8Encoder().encode(13), 0)) {
    return JitoRestakingInstruction.WarmupNcnVaultSlasherTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(14), 0)) {
    return JitoRestakingInstruction.CooldownNcnVaultSlasherTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(15), 0)) {
    return JitoRestakingInstruction.WarmupOperatorVaultTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(16), 0)) {
    return JitoRestakingInstruction.CooldownOperatorVaultTicket;
  }
  if (containsBytes(data, getU8Encoder().encode(17), 0)) {
    return JitoRestakingInstruction.NcnSetAdmin;
  }
  if (containsBytes(data, getU8Encoder().encode(18), 0)) {
    return JitoRestakingInstruction.NcnSetSecondaryAdmin;
  }
  if (containsBytes(data, getU8Encoder().encode(19), 0)) {
    return JitoRestakingInstruction.OperatorSetAdmin;
  }
  if (containsBytes(data, getU8Encoder().encode(20), 0)) {
    return JitoRestakingInstruction.OperatorSetSecondaryAdmin;
  }
  if (containsBytes(data, getU8Encoder().encode(21), 0)) {
    return JitoRestakingInstruction.NcnDelegateTokenAccount;
  }
  if (containsBytes(data, getU8Encoder().encode(22), 0)) {
    return JitoRestakingInstruction.OperatorDelegateTokenAccount;
  }
  throw new Error(
    'The provided instruction could not be identified as a jitoRestaking instruction.'
  );
}

export type ParsedJitoRestakingInstruction<
  TProgram extends string = '2gYZ1xHgydtzqfRuwvoL5oZmJzRo6TDQJNjuf2fARouZ',
> =
  | ({
      instructionType: JitoRestakingInstruction.InitializeConfig;
    } & ParsedInitializeConfigInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.InitializeNcn;
    } & ParsedInitializeNcnInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.InitializeOperator;
    } & ParsedInitializeOperatorInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.InitializeNcnVaultSlasherTicket;
    } & ParsedInitializeNcnVaultSlasherTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.InitializeNcnVaultTicket;
    } & ParsedInitializeNcnVaultTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.InitializeOperatorVaultTicket;
    } & ParsedInitializeOperatorVaultTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.InitializeNcnOperatorState;
    } & ParsedInitializeNcnOperatorStateInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.WarmupNcnVaultTicket;
    } & ParsedWarmupNcnVaultTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.CooldownNcnVaultTicket;
    } & ParsedCooldownNcnVaultTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.NcnWarmupOperator;
    } & ParsedNcnWarmupOperatorInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.NcnCooldownOperator;
    } & ParsedNcnCooldownOperatorInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.OperatorWarmupNcn;
    } & ParsedOperatorWarmupNcnInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.OperatorCooldownNcn;
    } & ParsedOperatorCooldownNcnInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.WarmupNcnVaultSlasherTicket;
    } & ParsedWarmupNcnVaultSlasherTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.CooldownNcnVaultSlasherTicket;
    } & ParsedCooldownNcnVaultSlasherTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.WarmupOperatorVaultTicket;
    } & ParsedWarmupOperatorVaultTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.CooldownOperatorVaultTicket;
    } & ParsedCooldownOperatorVaultTicketInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.NcnSetAdmin;
    } & ParsedNcnSetAdminInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.NcnSetSecondaryAdmin;
    } & ParsedNcnSetSecondaryAdminInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.OperatorSetAdmin;
    } & ParsedOperatorSetAdminInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.OperatorSetSecondaryAdmin;
    } & ParsedOperatorSetSecondaryAdminInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.NcnDelegateTokenAccount;
    } & ParsedNcnDelegateTokenAccountInstruction<TProgram>)
  | ({
      instructionType: JitoRestakingInstruction.OperatorDelegateTokenAccount;
    } & ParsedOperatorDelegateTokenAccountInstruction<TProgram>);
