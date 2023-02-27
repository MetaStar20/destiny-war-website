//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DestinyWarPet is ERC721Enumerable, Ownable {
  using SafeMath for uint256;
  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdTracker;

  IERC20 DWAR;
  uint256 public constant MAX_SUPPLY = 50000;
  uint256 public imageAmount = 21;

  uint256 public tokenPrice = 2000 ether; //2000 Dwar
  uint256 public maxPerMint = 1;

  bool public presaleActive = true;

  string public baseTokenURI;

  string private baseExtension = ".gif";

  address public rewardAddress = 0xE129775Be4917Fd59cb86223e8929EEa7EcD6A4f;
  address public lpAddress = 0x267Ee6F2911270A465cA4d595eCaF4e736BDffCA;
  address public devAddress = 0x6eF58Fba913c3389645bd09302cFD545437FEE43;
  address public charityAddress = 0xC4cE2e37f557c1C5a84bFfAA5008Eb571E1e557B;
  address public founderAddress = 0x1b7722cb92552824961a0fed5732B8dB21E4697d;
  address public constant BURN_WALLET = 0x000000000000000000000000000000000000dEaD;

  struct Pet {
    uint256 tokenId;
    string tokenURI;
  }

  struct Stat1 {
    uint256 HP;
    uint256 MP;
    uint256 PA;
    uint256 PD;
    uint256 MA;
    uint256 MD;
    uint256 Dodge;
    uint256 CH;
  }

  struct Stat2 {
    uint256 CON;
    uint256 SPI;
    uint256 STR;
    uint256 CPS;
    uint256 DEX;
  }

  mapping(uint256 => Pet) public pets;
  mapping(uint256 => Stat1) public stats1;
  mapping(uint256 => Stat2) public stats2;

  constructor(address _dwarAddress, string memory _baseTokenURI) ERC721("DestinyWarPet", "DWP") {
    baseTokenURI = _baseTokenURI;
    DWAR = IERC20(_dwarAddress);
  }

  /* MAIN FUNCTIONS */

  function reserveNFTs(uint256 _reserveAmount) public onlyOwner {
    uint256 totalMinted = _tokenIdTracker.current();
    require(totalMinted.add(_reserveAmount) < MAX_SUPPLY, "Not enough NFTs");
    for (uint256 i = 0; i < _reserveAmount; i++) {
      _mintSingleNFT(msg.sender);
    }
  }

  function giftNFT(uint256 tokenId, address to) public {
    safeTransferFrom(msg.sender, to, tokenId);
  }

  function mintNFTs(uint256 _count) public {
    uint256 totalMinted = _tokenIdTracker.current();
    uint256 funds = tokenPrice * _count;

    require(totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs!");
    require(_count > 0 && _count <= maxPerMint, "Cannot mint specified number of NFTs.");
    require(DWAR.balanceOf(msg.sender) >= funds, "You have not enough balance.");

    uint256 rewardBalance = funds.mul(30).div(100);
    uint256 lpBalance = funds.mul(10).div(100);
    uint256 devBalance = funds.mul(10).div(100);
    uint256 charityBalance = funds.mul(10).div(100);
    uint256 founderBalance = funds.mul(10).div(100);
    uint256 burnBalance = funds.mul(30).div(100);
    DWAR.transferFrom(msg.sender, rewardAddress, rewardBalance);
    DWAR.transferFrom(msg.sender, lpAddress, lpBalance);
    DWAR.transferFrom(msg.sender, devAddress, devBalance);
    DWAR.transferFrom(msg.sender, charityAddress, charityBalance);
    DWAR.transferFrom(msg.sender, founderAddress, founderBalance);
    DWAR.transferFrom(msg.sender, BURN_WALLET, burnBalance);
    _mintSingleNFT(msg.sender);
  }

  function _mintSingleNFT(address to) private {
    require(totalSupply() < MAX_SUPPLY, "All NFTs are minted already");
    _tokenIdTracker.increment();
    uint256 newTokenId = _tokenIdTracker.current();
    uint256 newUriId = random(imageAmount);
    string memory realTokenURI = string(abi.encodePacked(baseTokenURI, newUriId.toString(), baseExtension));
    
    pets[newTokenId] = Pet({ tokenId: newTokenId, tokenURI: realTokenURI });
    stats1[newTokenId] = Stat1({ HP: 150, MP: 100, PA: 25, PD: 50, MA: 25, MD: 50, Dodge: 3, CH: 15 });
    stats2[newTokenId] = Stat2({ CON: 0, SPI: 0, STR: 0, CPS: 0, DEX: 0 });

    _safeMint(to, newTokenId);
  }



  /* OVERRIDE */
  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

    string memory realTokenURI = string(abi.encodePacked(baseTokenURI, tokenId.toString(), baseExtension));

    return bytes(baseTokenURI).length > 0 ? realTokenURI : "";
  }

  // function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
  //   super._beforeTokenTransfer(from, to, tokenId);
  // }

  // function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
  //   return super.supportsInterface(interfaceId);
  // }


  /* UTILS */
  function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 tokenCount = balanceOf(_owner);
    uint256[] memory tokensId = new uint256[](tokenCount);
    for (uint256 i = 0; i < tokenCount; i++) {
      tokensId[i] = tokenOfOwnerByIndex(_owner, i);
    }

    return tokensId;
  }

  function random(uint256 limit) public view returns (uint256) {
    return uint8(uint256(keccak256(abi.encodePacked(block.timestamp)))%(limit) + 1);
  }

  /* SETTER */
  function setPrice(uint256 _price) public onlyOwner {
    tokenPrice = _price;
  }

  function setMaxPerMint(uint256 _newValue) public onlyOwner {
    maxPerMint = _newValue;
  }

  function setBaseURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }

  function setBaseExtension(string memory _baseExtension) public onlyOwner {
    baseExtension = _baseExtension;
  }

  function setDwarTokenAddress(address _dwarAddress) public onlyOwner {
    DWAR = IERC20(_dwarAddress);
  }

  function setRewardAddress(address _address) public onlyOwner {
    rewardAddress = _address;
  }

  function setLpAddress(address _address) public onlyOwner {
    lpAddress = _address;
  }

  function setDevAddress(address _address) public onlyOwner {
    devAddress = _address;
  }

  function setCharityAddress(address _address) public onlyOwner {
    charityAddress = _address;
  }

  function setFounderAddress(address _address) public onlyOwner {
    founderAddress = _address;
  }

  function setImageAmount(uint256 _amount) public onlyOwner {
    imageAmount = _amount;
  }


  /* GETTER */
  function getPet(uint256 _tokenId) external view returns (uint256, string memory) {
    return (pets[_tokenId].tokenId, pets[_tokenId].tokenURI);
  }

  function getStat1(uint256 _tokenId) external view returns (Stat1 memory) {
    return stats1[_tokenId];
  }

  function getStat2(uint256 _tokenId) external view returns (Stat2 memory) {
    return stats2[_tokenId];
  }

  function withdraw() public onlyOwner {
    uint256 balance = DWAR.balanceOf(address(this));
    require(balance > 0, "No ether left to withdraw");
    DWAR.transfer(msg.sender, balance);
  }

}