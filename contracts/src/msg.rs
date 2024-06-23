use cosmwasm_schema::{cw_serde, QueryResponses};
use cosmwasm_std::Uint128;
use serde::{Deserialize, Serialize};
use schemars::JsonSchema;

#[cw_serde]
pub struct InstantiateMsg {
    pub owner: String,
    pub initial_supply: Uint128,
}

#[cw_serde]
pub enum ExecuteMsg {
    Transfer { recipient: String, amount: Uint128 },
    Burn { amount: Uint128 },
}
// npx ts-node index.ts    
#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {
    #[returns(BalanceResponse)]
    GetBalance { address: String },
    
    #[returns(OwnerResponse)]
    GetOwner {},
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct BalanceResponse {
    pub balance: Uint128,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct OwnerResponse {
    pub owner: String,
}
