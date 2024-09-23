//! Trait that can be used when working with Solana structs that are used as accounts.

pub mod error;
pub mod slice;
pub mod types;

use bytemuck::Pod;
pub use jito_account_traits_derive::AccountDeserialize;
use solana_program::{msg, program_error::ProgramError};

pub trait Discriminator {
    const DISCRIMINATOR: u8;
}

pub trait AccountDeserialize: Sized + Pod + Discriminator {
    /// Deserialize the account data into a struct.
    /// It assumes the first byte is the discriminator and the next seven bytes are reserved.
    /// The rest of the data is deserialized into the struct.
    ///
    /// # Arguments
    /// * `data` - The account data to deserialize
    ///
    /// # Returns
    /// * `Result<&Self, ProgramError>` - The deserialized struct as a reference or an error
    fn try_from_slice_unchecked(data: &[u8]) -> Result<&Self, ProgramError> {
        if data.first() != Some(&Self::DISCRIMINATOR) {
            msg!(
                "Discriminator is invalid; expected {}, got {}",
                Self::DISCRIMINATOR,
                data.first().unwrap()
            );
            return Err(ProgramError::InvalidAccountData);
        }
        bytemuck::try_from_bytes(&data[8..]).map_err(|_| ProgramError::InvalidAccountData)
    }

    /// Deserialize the account data into a mutable struct.
    /// It assumes the first byte is the discriminator and the next seven bytes are reserved.
    /// The rest of the data is deserialized into the struct.
    ///
    /// # Arguments
    /// * `data` - The account data to deserialize
    ///
    /// # Returns
    /// * `Result<&mut Self, ProgramError>` - The deserialized struct as a reference or an error
    fn try_from_slice_unchecked_mut(data: &mut [u8]) -> Result<&mut Self, ProgramError> {
        if data.first() != Some(&Self::DISCRIMINATOR) {
            msg!(
                "Discriminator is invalid; expected {}, got {}",
                Self::DISCRIMINATOR,
                data.first().unwrap()
            );
            return Err(ProgramError::InvalidAccountData);
        }
        bytemuck::try_from_bytes_mut(&mut data[8..]).map_err(|_| ProgramError::InvalidAccountData)
    }
}

/// On-chain size of a `Pod` type
pub const fn pod_get_packed_len<T: Pod>() -> usize {
    std::mem::size_of::<T>()
}

/// Convert a `Pod` into a slice of bytes (zero copy)
pub fn pod_bytes_of<T: Pod>(t: &T) -> &[u8] {
    bytemuck::bytes_of(t)
}

/// Convert a slice of bytes into a `Pod` (zero copy)
pub fn pod_from_bytes<T: Pod>(bytes: &[u8]) -> Result<&T, ProgramError> {
    bytemuck::try_from_bytes(bytes).map_err(|_| ProgramError::InvalidArgument)
}

/// Maybe convert a slice of bytes into a `Pod` (zero copy)
///
/// Returns `None` if the slice is empty, or else `Err` if input length is not
/// equal to `pod_get_packed_len::<T>()`.
/// This function exists primarily because `Option<T>` is not a `Pod`.
pub fn pod_maybe_from_bytes<T: Pod>(bytes: &[u8]) -> Result<Option<&T>, ProgramError> {
    if bytes.is_empty() {
        Ok(None)
    } else {
        bytemuck::try_from_bytes(bytes)
            .map(Some)
            .map_err(|_| ProgramError::InvalidArgument)
    }
}

/// Convert a slice of bytes into a mutable `Pod` (zero copy)
pub fn pod_from_bytes_mut<T: Pod>(bytes: &mut [u8]) -> Result<&mut T, ProgramError> {
    bytemuck::try_from_bytes_mut(bytes).map_err(|_| ProgramError::InvalidArgument)
}

/// Convert a slice of bytes into a `Pod` slice (zero copy)
pub fn pod_slice_from_bytes<T: Pod>(bytes: &[u8]) -> Result<&[T], ProgramError> {
    bytemuck::try_cast_slice(bytes).map_err(|_| ProgramError::InvalidArgument)
}

/// Convert a slice of bytes into a mutable `Pod` slice (zero copy)
pub fn pod_slice_from_bytes_mut<T: Pod>(bytes: &mut [u8]) -> Result<&mut [T], ProgramError> {
    bytemuck::try_cast_slice_mut(bytes).map_err(|_| ProgramError::InvalidArgument)
}

/// Convert a `Pod` slice into a single slice of bytes
pub fn pod_slice_to_bytes<T: Pod>(slice: &[T]) -> &[u8] {
    bytemuck::cast_slice(slice)
}
