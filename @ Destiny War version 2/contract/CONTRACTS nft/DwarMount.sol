//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract DestinyWarMount is ERC721Enumerable, Ownable {
  using SafeMath for uint256;
  using Strings for uint256;
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdTracker;

  IERC20 DWAR;
  uint256 public constant MAX_SUPPLY = 50000;
  uint256 public oneStarImageAmount = 18;
  uint256 public twoStarImageAmount = 9;
  uint256 public threeStarImageAmount = 10;

  uint256 twoStarPerOneStar;

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

  struct Mount {
    uint256 tokenId;
    string tokenURI;
    uint256 star;
  }

  struct Stat {
    uint256 HP;
    uint256 MP;
    uint256 PA;
    uint256 PD;
    uint256 MA;
    uint256 MD;
    uint256 Dodge;
    uint256 CH;
  }


  mapping(uint256 => Mount) public mounts;
  mapping(uint256 => Stat) public stats;

  constructor(address _dwarAddress, string memory _baseTokenURI) ERC721("DestinyWarMount", "DWM") {
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
    uint256 newUriId;
    uint256 currentStar;
    Stat memory currentStat;

    if (newTokenId <= 165) {
        newUriId = random(threeStarImageAmount);
        currentStar = 3;
        currentStat = Stat({ HP: 100, MP: 100, PA: 100, PD: 100, MA: 100, MD: 100, Dodge: 10, CH: 500 });
    } else if (newTokenId > 165 && newTokenId % twoStarPerOneStar == 0) {
        newUriId = random(twoStarImageAmount);
        currentStar = 2;
        currentStat = Stat({ HP: 200, MP: 200, PA: 200, PD: 200, MA: 200, MD: 200, Dodge: 15, CH: 700 });
    } else {
        newUriId = random(oneStarImageAmount);
        currentStar = 1;
        currentStat = Stat({ HP: 300, MP: 300, PA: 300, PD: 300, MA: 300, MD: 300, Dodge: 18, CH: 1000 });
    }
    string memory realTokenURI = string(abi.encodePacked(baseTokenURI, currentStar.toString(), "/", newUriId.toString(), baseExtension));
    
    mounts[newTokenId] = Mount({ tokenId: newTokenId, tokenURI: realTokenURI, star: currentStar });
    stats[newTokenId] = currentStat;

    _safeMint(to, newTokenId);
  }



  /* OVERRIDE */
//   function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
//     require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");

//     bool isRare = tokenId > 349 && tokenId % rarePerNormal == 0;
//     string memory currentBaseURI = isRare ? rareTokenURI : normalTokenURI;
//     string memory realTokenURI = string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension));

//     return bytes(currentBaseURI).length > 0 ? realTokenURI : "";
//   }

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

  function setTwoStarPerOneStar(uint256 _twoStarPerOneStar) public onlyOwner {
    twoStarPerOneStar = _twoStarPerOneStar;
  }

  function setOneStarImageAmount(uint256 _amount) public onlyOwner {
    oneStarImageAmount = _amount;
  }

  function setTwoStarImageAmount(uint256 _amount) public onlyOwner {
    twoStarImageAmount = _amount;
  }

  function setThreeStarImageAmount(uint256 _amount) public onlyOwner {
    threeStarImageAmount = _amount;
  }
  function setStat(uint256 _tokenId, uint256 _hp, uint256 _mp, uint256 _pa, uint256 _pd, uint256 _ma, uint256 _md, uint256 _dodge, uint256 _ch) public onlyOwner {
    stats[_tokenId] = Stat({ HP: _hp, MP: _mp, PA: _pa, PD: _pd, MA: _ma, MD: _md, Dodge: _dodge, CH: _ch });
  }

  /* GETTER */
  function getMount(uint256 _tokenId) external view returns (uint256, string memory, uint256) {
    return (mounts[_tokenId].tokenId, mounts[_tokenId].tokenURI, mounts[_tokenId].star);
  }

  function getStat(uint256 _tokenId) external view returns (Stat memory) {
    return stats[_tokenId];
  }

  function withdraw() public onlyOwner {
    uint256 balance = DWAR.balanceOf(address(this));
    require(balance > 0, "No ether left to withdraw");
    DWAR.transfer(msg.sender, balance);
  }

}