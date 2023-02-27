import { ethers } from "ethers"
import characterABI from "./abis/characterAbi.json"
import mountABI from "./abis/mountAbi.json"
import petABI from "./abis/petAbi.json"
import { ENVS } from "./configurations/index"

// Contract can be used to write Contract
export const getContractWithSigner = (cId = 1) => {
  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = infuraProvider.getSigner()
  const contractABI = (cId === 1 ? characterABI : (cId === 2 ?  mountABI : petABI))
  let CONTRACT_ADDR = (cId === 1 ? ENVS.CHARACTER_ADDRESS : (cId === 2 ?  ENVS.MOUNT_ADDRESS : ENVS.PET_ADDRESS))
  const contract = new ethers.Contract(
    CONTRACT_ADDR,
    contractABI,
    signer
  )

  return contract
}

// Contract can be used to read Contract
const getContractWithoutSigner = (cId = 1 ) => {

  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum)

  let CONTRACT_ADDR = (cId === 1 ? ENVS.CHARACTER_ADDRESS : (cId === 2 ?  ENVS.MOUNT_ADDRESS : ENVS.PET_ADDRESS))
  const contractABI = (cId === 1 ? characterABI : (cId === 2 ?  mountABI : petABI))
  const contract = new ethers.Contract(
    CONTRACT_ADDR,
    contractABI,
    infuraProvider
  )

  return contract
}

// Get Token Ids of the selected Wallet
export const getTokenIdsOfWallet = async (walletAddress) => {
  const contract = getContractWithSigner()
  let tokenIds = []

  try {
    let ids = await contract.getTokenIdsOfWallet(walletAddress)
    for (let i = 0; i < ids.length; i++) {
      tokenIds.push(ethers.BigNumber.from(ids[i]).toNumber())
    }

    return tokenIds
  } catch (err) {
    return []
  }
}

// Get Current Total Supply from the Contract
export const getCurrentTotalSupply = async () => {
  const contract = getContractWithoutSigner()
  try {
    let totalSupply = await contract.totalSupply()

    return ethers.BigNumber.from(totalSupply).toNumber()
  } catch (err) {
    return 0
  }
}

// Get Current Total Supply from the Contract
export const getItemProperty = async (walletAddr, cId) => {

  console.log(walletAddr);

  if (!!walletAddr) {

  let walletAddress = ethers.utils.getAddress(walletAddr);
  
  const contract = getContractWithoutSigner(cId)
  try {
    let arrIds = await contract.walletOfOwner(walletAddress)
    let property = await contract.getItemProperty(arrIds[0])
    return property
  } catch (err) {
    return "";
  }
}
}


// Get Max Element Counts from the Contract
export const getCurrentMaxSupply = async () => {
  const contract = getContractWithoutSigner()

  try {
    let currentMaxSupply = await contract.maxSales()

    return ethers.BigNumber.from(currentMaxSupply).toNumber()
  } catch (err) {
    return 0
  }
}

export const getNumber =  async (_number) => {
  return ethers.BigNumber.from(_number).toNumber()
}

// Get Max Mintable Counts per Click from the Contract
export const getCurrentMaxMint = async () => {
  const contract = getContractWithoutSigner()

  try {
    let currentMaxMint = await contract.maxMint()

    return ethers.BigNumber.from(currentMaxMint).toNumber()
  } catch (err) {
    return 0
  }
}

export const getOccupiedIds = async () => {
  const contract = getContractWithoutSigner()

  try {
    let occupiedList = await contract.occupiedList()

    return occupiedList
  } catch (err) {
    return 0
  }
}

export const getIsWhiteList = async(walletAddress) => {
  const contract = getContractWithoutSigner(3) // for pet;
  try {
      let result = await contract.isHolderList(walletAddress)
      return result
  } catch (err) {
      return 0
  }
}


