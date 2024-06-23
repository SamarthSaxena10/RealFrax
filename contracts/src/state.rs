use cosmwasm_std::Addr;
use cw_storage_plus::{Item, Map};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct NFT {
    pub owner: Addr,    // Public to allow access from contract.rs
    pub token_id: String,  // Public to allow access from contract.rs
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Fraction {
    pub token_id: String,   // Public for accessibility
    pub royalties: u8,      // Public for accessibility
    pub total_supply: u128, // Public for accessibility
    pub token_name: String, // Public for accessibility
    pub token_ticker: String, // Public for accessibility
    pub fractions: Vec<FractionDetail>, // Public to allow modification from contract.rs
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct FractionDetail {
    pub recipient: Addr, // Ensure this is accessible if needed
    pub percentage: u8,  // Ensure this is accessible if needed
}

// State map for storing individual NFTs
pub const NFTS: Map<String, NFT> = Map::new("nfts");

// State map for storing fractions associated with NFTs
pub const FRACTIONS: Map<String, Fraction> = Map::new("fractions");
