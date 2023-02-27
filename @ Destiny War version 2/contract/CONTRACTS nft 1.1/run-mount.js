const { utils } = require("ethers");

async function main() {
  const dwarTokenAddress = "0xCBABff9e4535E7DC28C6fcCFfF280E4DFF7ADbb6";
  const baseURI = "https://gateway.pinata.cloud/ipfs/QmRZecSbjXLRHHeMy7qyj5MZUSMEX5eo6J1wchMmkKfgS9/";
  

  // Get owner/deployer's wallet address
  const [owner] = await hre.ethers.getSigners();

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("DestinyWarMount");

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(dwarTokenAddress, baseURI);

  // Wait for this transaction to be mined
  await contract.deployed();

  // Get contract address
  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
