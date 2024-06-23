use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum ContractError {
    #[error("{0}")]
    Std(#[from] StdError),

    #[error("Unauthorized")]
    Unauthorized,

    #[error("NFT already exists")]
    NFTExists,

    #[error("NFT not found")]
    NFTNotFound,

    #[error("Invalid fractions")]
    InvalidFractions,
}
