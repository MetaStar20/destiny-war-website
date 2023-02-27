import { ethers } from "ethers";
import { getContractWithSigner } from "./contract";

export const mintNFT = async (walletAddress, setMintLoading, numbers, cId) => {
  const contract = getContractWithSigner(cId);
  try {
    let txhash;
    if (cId === 1) {
      txhash = await contract.DwarCharacter(numbers, {
        value: ethers.BigNumber.from(1e9).mul(
          ethers.BigNumber.from(1e9).mul(35).div(1000).mul(numbers)
        ),
        from: walletAddress,
      });
    } else if (cId === 2) {
      txhash = await contract.DwarMount(numbers, {
        value: ethers.BigNumber.from(1e9).mul(
          ethers.BigNumber.from(1e9).mul(35).div(1000).mul(numbers)
        ),
        from: walletAddress,
      });
    } else {
      txhash = await contract.DwarPet(numbers, {
        value: ethers.BigNumber.from(1e9).mul(
          ethers.BigNumber.from(1e9).mul(35).div(1000).mul(numbers)
        ),
        from: walletAddress,
      });
    }

    let res = await txhash.wait();
    setMintLoading(false);

    if (res.transactionHash) {
      return {
        success: true,
        status: `Successfully minted ${numbers} Mos.`,
      };
    } else {
      return {
        success: false,
        status: "Transaction failed",
      };
    }
  } catch (err) {
    setMintLoading(false);
    return {
      success: false,
      status: err.message,
    };
  }
};


export const mintFreeNFT = async (walletAddress, setMintLoading, numbers, cId) => {
  const contract = getContractWithSigner(cId);
  try {
    let txhash;
    if (cId === 1) {
      txhash = await contract.DwarCharacter(numbers, {
        value: ethers.BigNumber.from(1e9).mul(
          ethers.BigNumber.from(1e9).mul(35).div(1000).mul(0)
        ),
        from: walletAddress,
      });
    } else if (cId === 2) {
      txhash = await contract.DwarMount(numbers, {
        value: ethers.BigNumber.from(1e9).mul(
          ethers.BigNumber.from(1e9).mul(35).div(1000).mul(0)
        ),
        from: walletAddress,
      });
    } else {
      txhash = await contract.DwarPet(numbers, {
        value: ethers.BigNumber.from(1e9).mul(
          ethers.BigNumber.from(1e9).mul(35).div(1000).mul(0)
        ),
        from: walletAddress,
      });
    }

    let res = await txhash.wait();
    setMintLoading(false);

    if (res.transactionHash) {
      return {
        success: true,
        status: `Successfully minted ${numbers} Mos.`,
      };
    } else {
      return {
        success: false,
        status: "Transaction failed",
      };
    }
  } catch (err) {
    setMintLoading(false);
    return {
      success: false,
      status: err.message,
    };
  }
};

