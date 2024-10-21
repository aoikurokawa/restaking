//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! <https://github.com/kinobi-so/kinobi>

use num_derive::FromPrimitive;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum JitoVaultError {
    /// 1000 - VaultSlashUnderflow
    #[error("VaultSlashUnderflow")]
    VaultSlashUnderflow = 0x3E8,
    /// 1001 - VaultInsufficientFunds
    #[error("VaultInsufficientFunds")]
    VaultInsufficientFunds = 0x3E9,
    /// 1002 - VaultOverflow
    #[error("VaultOverflow")]
    VaultOverflow = 0x3EA,
    /// 1003 - VaultOperatorAdminInvalid
    #[error("VaultOperatorAdminInvalid")]
    VaultOperatorAdminInvalid = 0x3EB,
    /// 1004 - VaultAdminInvalid
    #[error("VaultAdminInvalid")]
    VaultAdminInvalid = 0x3EC,
    /// 1005 - VaultCapacityAdminInvalid
    #[error("VaultCapacityAdminInvalid")]
    VaultCapacityAdminInvalid = 0x3ED,
    /// 1006 - VaultMintBurnAdminInvalid
    #[error("VaultMintBurnAdminInvalid")]
    VaultMintBurnAdminInvalid = 0x3EE,
    /// 1007 - VaultDelegationAdminInvalid
    #[error("VaultDelegationAdminInvalid")]
    VaultDelegationAdminInvalid = 0x3EF,
    /// 1008 - VaultDelegateAssetAdminInvalid
    #[error("VaultDelegateAssetAdminInvalid")]
    VaultDelegateAssetAdminInvalid = 0x3F0,
    /// 1009 - VaultCapacityExceeded
    #[error("VaultCapacityExceeded")]
    VaultCapacityExceeded = 0x3F1,
    /// 1010 - VaultSlasherAdminInvalid
    #[error("VaultSlasherAdminInvalid")]
    VaultSlasherAdminInvalid = 0x3F2,
    /// 1011 - VaultNcnAdminInvalid
    #[error("VaultNcnAdminInvalid")]
    VaultNcnAdminInvalid = 0x3F3,
    /// 1012 - VaultFeeAdminInvalid
    #[error("VaultFeeAdminInvalid")]
    VaultFeeAdminInvalid = 0x3F4,
    /// 1013 - VaultConfigAdminInvalid
    #[error("VaultConfigAdminInvalid")]
    VaultConfigAdminInvalid = 0x3F5,
    /// 1014 - VaultConfigFeeAdminInvalid
    #[error("VaultConfigFeeAdminInvalid")]
    VaultConfigFeeAdminInvalid = 0x3F6,
    /// 1015 - VaultFeeCapExceeded
    #[error("VaultFeeCapExceeded")]
    VaultFeeCapExceeded = 0x3F7,
    /// 1016 - VaultEpochWithdrawCapExceeded
    #[error("VaultEpochWithdrawCapExceeded")]
    VaultEpochWithdrawCapExceeded = 0x3F8,
    /// 1017 - VaultFeeChangeTooSoon
    #[error("VaultFeeChangeTooSoon")]
    VaultFeeChangeTooSoon = 0x3F9,
    /// 1018 - VaultFeeBumpTooLarge
    #[error("VaultFeeBumpTooLarge")]
    VaultFeeBumpTooLarge = 0x3FA,
    /// 1019 - VaultUnderflow
    #[error("VaultUnderflow")]
    VaultUnderflow = 0x3FB,
    /// 1020 - VaultUpdateNeeded
    #[error("VaultUpdateNeeded")]
    VaultUpdateNeeded = 0x3FC,
    /// 1021 - VaultIsUpdated
    #[error("VaultIsUpdated")]
    VaultIsUpdated = 0x3FD,
    /// 1022 - VaultOperatorDelegationUpdateNeeded
    #[error("VaultOperatorDelegationUpdateNeeded")]
    VaultOperatorDelegationUpdateNeeded = 0x3FE,
    /// 1023 - VaultOperatorDelegationIsUpdated
    #[error("VaultOperatorDelegationIsUpdated")]
    VaultOperatorDelegationIsUpdated = 0x3FF,
    /// 1024 - VaultUpdateIncorrectIndex
    #[error("VaultUpdateIncorrectIndex")]
    VaultUpdateIncorrectIndex = 0x400,
    /// 1025 - VaultUpdateStateNotFinishedUpdating
    #[error("VaultUpdateStateNotFinishedUpdating")]
    VaultUpdateStateNotFinishedUpdating = 0x401,
    /// 1026 - VaultSecurityOverflow
    #[error("VaultSecurityOverflow")]
    VaultSecurityOverflow = 0x402,
    /// 1027 - VaultSlashIncomplete
    #[error("VaultSlashIncomplete")]
    VaultSlashIncomplete = 0x403,
    /// 1028 - VaultSecurityUnderflow
    #[error("VaultSecurityUnderflow")]
    VaultSecurityUnderflow = 0x404,
    /// 1029 - SlippageError
    #[error("SlippageError")]
    SlippageError = 0x405,
    /// 1030 - SlippageTooLow
    #[error("SlippageTooLow")]
    SlippageTooLow = 0x406,
    /// 1031 - VaultStakerWithdrawalTicketNotWithdrawable
    #[error("VaultStakerWithdrawalTicketNotWithdrawable")]
    VaultStakerWithdrawalTicketNotWithdrawable = 0x407,
    /// 1032 - VaultNcnSlasherTicketFailedCooldown
    #[error("VaultNcnSlasherTicketFailedCooldown")]
    VaultNcnSlasherTicketFailedCooldown = 0x408,
    /// 1033 - VaultNcnSlasherTicketFailedWarmup
    #[error("VaultNcnSlasherTicketFailedWarmup")]
    VaultNcnSlasherTicketFailedWarmup = 0x409,
    /// 1034 - VaultNcnTicketFailedCooldown
    #[error("VaultNcnTicketFailedCooldown")]
    VaultNcnTicketFailedCooldown = 0x40A,
    /// 1035 - VaultNcnTicketFailedWarmup
    #[error("VaultNcnTicketFailedWarmup")]
    VaultNcnTicketFailedWarmup = 0x40B,
    /// 1036 - VaultNcnTicketUnslashable
    #[error("VaultNcnTicketUnslashable")]
    VaultNcnTicketUnslashable = 0x40C,
    /// 1037 - OperatorVaultTicketUnslashable
    #[error("OperatorVaultTicketUnslashable")]
    OperatorVaultTicketUnslashable = 0x40D,
    /// 1038 - NcnOperatorStateUnslashable
    #[error("NcnOperatorStateUnslashable")]
    NcnOperatorStateUnslashable = 0x40E,
    /// 1039 - VaultNcnSlasherTicketUnslashable
    #[error("VaultNcnSlasherTicketUnslashable")]
    VaultNcnSlasherTicketUnslashable = 0x40F,
    /// 1040 - NcnVaultTicketUnslashable
    #[error("NcnVaultTicketUnslashable")]
    NcnVaultTicketUnslashable = 0x410,
    /// 1041 - NcnVaultSlasherTicketUnslashable
    #[error("NcnVaultSlasherTicketUnslashable")]
    NcnVaultSlasherTicketUnslashable = 0x411,
    /// 1042 - VaultMaxSlashedPerOperatorExceeded
    #[error("VaultMaxSlashedPerOperatorExceeded")]
    VaultMaxSlashedPerOperatorExceeded = 0x412,
    /// 1043 - VaultStakerWithdrawalTicketInvalidStaker
    #[error("VaultStakerWithdrawalTicketInvalidStaker")]
    VaultStakerWithdrawalTicketInvalidStaker = 0x413,
    /// 1044 - VaultWithdrawalLimitExceeded
    #[error("VaultWithdrawalLimitExceeded")]
    VaultWithdrawalLimitExceeded = 0x414,
    /// 1045 - SlasherOverflow
    #[error("SlasherOverflow")]
    SlasherOverflow = 0x415,
    /// 1046 - NcnOverflow
    #[error("NcnOverflow")]
    NcnOverflow = 0x416,
    /// 1047 - OperatorOverflow
    #[error("OperatorOverflow")]
    OperatorOverflow = 0x417,
    /// 1048 - VaultDelegationZero
    #[error("VaultDelegationZero")]
    VaultDelegationZero = 0x418,
    /// 1049 - VaultCooldownZero
    #[error("VaultCooldownZero")]
    VaultCooldownZero = 0x419,
    /// 1050 - VaultBurnZero
    #[error("VaultBurnZero")]
    VaultBurnZero = 0x41A,
    /// 1051 - VaultEnqueueWithdrawalAmountZero
    #[error("VaultEnqueueWithdrawalAmountZero")]
    VaultEnqueueWithdrawalAmountZero = 0x41B,
    /// 1052 - VaultMintZero
    #[error("VaultMintZero")]
    VaultMintZero = 0x41C,
    /// 1053 - VaultIsPaused
    #[error("VaultIsPaused")]
    VaultIsPaused = 0x41D,
    /// 1054 - InvalidDepositor
    #[error("InvalidDepositor")]
    InvalidDepositor = 0x41E,
    /// 1055 - InvalidDepositTokenAccount
    #[error("InvalidDepositTokenAccount")]
    InvalidDepositTokenAccount = 0x41F,
    /// 1056 - NoSupportedMintBalanceChange
    #[error("NoSupportedMintBalanceChange")]
    NoSupportedMintBalanceChange = 0x420,
    /// 1057 - InvalidEpochLength
    #[error("InvalidEpochLength")]
    InvalidEpochLength = 0x421,
    /// 3000 - ArithmeticOverflow
    #[error("ArithmeticOverflow")]
    ArithmeticOverflow = 0xBB8,
    /// 3001 - ArithmeticUnderflow
    #[error("ArithmeticUnderflow")]
    ArithmeticUnderflow = 0xBB9,
    /// 3002 - DivisionByZero
    #[error("DivisionByZero")]
    DivisionByZero = 0xBBA,
}

impl solana_program::program_error::PrintProgramError for JitoVaultError {
    fn print<E>(&self) {
        solana_program::msg!(&self.to_string());
    }
}
