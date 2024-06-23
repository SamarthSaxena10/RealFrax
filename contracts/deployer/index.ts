const { DirectSecp256k1HdWallet } = require("@cosmjs/proto-signing");
const {
  assertIsBroadcastTxSuccess,
  SigningCosmWasmClient,
  CosmWasmClient,
} = require("@cosmjs/cosmwasm-stargate");
const { coins, GasPrice } = require("@cosmjs/stargate");
const fs = require("fs");
require("dotenv").config();

const mnemonic =
  "ensure assault comic concert access timber coil cloth artist vibrant nominee fragile";
const rpcEndpoint = "https://rpc.hongbai.mantrachain.io"; // Replace with your RPC endpoint
const contractWasmPath = "./nftorai.wasm"; // Path to your compiled contract

async function deploy() {
  // Step 1: Set up wallet and client
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: "mantra", // Replace with the correct prefix for your chain
  });
  const [account] = await wallet.getAccounts();
  console.log(`Wallet address: ${account.address}`);

  // Step 2: Connect to the blockchain
  const client = await SigningCosmWasmClient.connectWithSigner(
    rpcEndpoint,
    wallet,
    { gasPrice: GasPrice.fromString("0.025uom") }
  );
  console.log("Connected to blockchain");

  // Step 3: Upload contract
  const wasmCode = fs.readFileSync("./nftorai.wasm");
  const uploadReceipt = await client.upload(
    account.address,
    wasmCode,
    "auto",
    "Upload CosmWasm contract"
  );
  const codeId = uploadReceipt.codeId;
  console.log(`Contract uploaded with Code ID: ${codeId}`);

  // Step 4: Instantiate contract
  const initMsg = {
    owner: "mantra124mxnk862smvvzqj5qev4f5x9dlumdtxa90wvh",
    initial_supply: "1000000",
  }; // Replace with your contract's init message
  const instantiateReceipt = await client.instantiate(
    account.address,
    codeId,
    initMsg,
    "My Dinonum Contract",
    "auto"
  );
  const contractAddress = instantiateReceipt.contractAddress;
  console.log(`Contract instantiated at reciept: ${instantiateReceipt}`);
  console.log(`Contract instantiated at address: ${contractAddress}`);
}

deploy().catch(console.error);