import React, { useState } from "react";

const DepositNFTForm = () => {
  const [nftId, setNftId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the NFT deposit here
    console.log("NFT ID:", nftId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-xl font-bold mb-4">
          Step 1: Deposit your SNFT to the contract
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nftId" className="block text-white mb-2">
              NFT ID
            </label>
            <input
              type="text"
              id="nftId"
              value={nftId}
              onChange={(e) => setNftId(e.target.value)}
              className="w-full p-2 border border-gray-600 rounded bg-gray-900 text-white"
              placeholder="NFT ID"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white text-gray-900 font-bold rounded hover:bg-gray-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default DepositNFTForm;
