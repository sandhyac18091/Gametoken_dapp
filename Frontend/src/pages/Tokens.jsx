import React, { useState } from "react";
import { ethers } from "ethers";
import { abi } from "../assets/GameToken.json";
import deployedAddress from "../assets/deployed_addresses.json";

const Tokens = () => {
  const [loading, setLoading] = useState(false);

  const handleCreateToken = async () => {
    if (!window.ethereum) {
      alert("MetaMask not found!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contractAddress = deployedAddress["tokens#GameToken"];
    if (!contractAddress) {
      alert("Contract address not found!");
      return;
    }

    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      setLoading(true);
      const recipientAddress = "0x97C520ae9B87E759D81b909462CE993A0Aff1ebD";
      const amount = ethers.parseUnits("1000", 18);

      const tx = await contract.createToken(recipientAddress, amount);
      await tx.wait();
      alert("Token created successfully!");
    } catch (error) {
      console.error(error);
      alert("Error creating token");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Token Creator</h1>
        <button
          onClick={handleCreateToken}
          disabled={loading}
          className={`px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-700"
          }`}
        >
          {loading ? "Creating..." : "Create Token"}
        </button>
      </div>
    </div>
  );
};

export default Tokens;
