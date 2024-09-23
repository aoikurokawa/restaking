//! Error types
use solana_program::program_error::ProgramError;
use thiserror::Error;

/// Errors that may be returned by the spl-pod library.
#[derive(Debug, Error, PartialEq, Eq)]
pub enum PodSliceError {
    /// Error in checked math operation
    #[error("Error in checked math operation")]
    CalculationFailure,
    /// Provided byte buffer too small for expected type
    #[error("Provided byte buffer too small for expected type")]
    BufferTooSmall,
    /// Provided byte buffer too large for expected type
    #[error("Provided byte buffer too large for expected type")]
    BufferTooLarge,
}

impl From<PodSliceError> for ProgramError {
    fn from(e: PodSliceError) -> Self {
        Self::Custom(e as u32)
    }
}
