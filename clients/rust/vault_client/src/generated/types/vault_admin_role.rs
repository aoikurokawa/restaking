//! This code was AUTOGENERATED using the codama library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun codama to update it.
//!
//! <https://github.com/codama-idl/codama>

use borsh::{BorshDeserialize, BorshSerialize};
use clap::ValueEnum;
use num_derive::FromPrimitive;

#[derive(
    BorshSerialize,
    BorshDeserialize,
    Clone,
    Debug,
    Eq,
    PartialEq,
    Copy,
    Hash,
    FromPrimitive,
    ValueEnum,
)]
#[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
pub enum VaultAdminRole {
    DelegationAdmin,
    OperatorAdmin,
    NcnAdmin,
    SlasherAdmin,
    CapacityAdmin,
    FeeWallet,
    MintBurnAdmin,
    DelegateAssetAdmin,
    FeeAdmin,
    MetadataAdmin,
}
