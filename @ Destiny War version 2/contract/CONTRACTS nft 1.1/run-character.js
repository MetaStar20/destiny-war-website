const { utils } = require("ethers");

async function main() {
  const dwarTokenAddress = "0xCBABff9e4535E7DC28C6fcCFfF280E4DFF7ADbb6";
  const normalURI = "https://gateway.pinata.cloud/ipfs/QmVEFivQ2NDdm4FA2FTYWFi2nJRjPbc43XE8UMzdC5ZaPH/character_normal/";
  const rareURI = "https://gateway.pinata.cloud/ipfs/QmVEFivQ2NDdm4FA2FTYWFi2nJRjPbc43XE8UMzdC5ZaPH/character_rare/";
  const rarePerNormal = 50;

  // Get owner/deployer's wallet address
  const [owner] = await hre.ethers.getSigners();

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("DestinyWarCharacter");

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(dwarTokenAddress, normalURI, rareURI, rarePerNormal);

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
