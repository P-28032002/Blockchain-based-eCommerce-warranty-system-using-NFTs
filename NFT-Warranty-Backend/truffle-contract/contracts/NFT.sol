// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Importing the standard libraries for NFT (ERC721)
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Importing utility libraries for using safe datatypes
import "@openzeppelin/contracts/utils/Counters.sol";

// The NFT contract is inheriting the ERC721URIStorage contract
// ERC721URIStorage provide option to add metadata in the NFT
contract NFT is ERC721URIStorage {

    // Safe datatype, allow only increment/decrement operation
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // Metadata of item
    struct Metadata {
        string brand; // brand or manufacturer of item
        string model; // Model id/no./title of item
        uint warrantyPeriod; // Warranty period of item in timestamp
        string identifier; // Unique identification id for item
    }
    // tokenId to Metadata mapping
    mapping(uint256 => Metadata) private _metadata;

    // Initializing the ERC721 contract with NFT Name and Symbol Name
    constructor() ERC721("Warranty NFT", "W-NFT"){}

    // Sets the Metadata of `tokenId`
    function _setMetadata(uint256 tokenId, Metadata memory metdata) internal {
        require(_exists(tokenId), "Metadata set of nonexistent token");
        _metadata[tokenId] = metdata;
    }

    // Return the Metadata of `tokenId`
    function getMetadata(uint256 tokenId) public view returns (Metadata memory) {
        _requireMinted(tokenId);
        return _metadata[tokenId];
    }

    // Function for minting
    function mint(string memory _tokenURI, Metadata memory metadata) external returns (uint256)
    {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();  // get new tokenId

        _mint(msg.sender, newItemId);  // mint token with sender address
        _setTokenURI(newItemId, _tokenURI); // set tokenURI of token
        _setMetadata(newItemId, metadata); // set metadata of token

        return newItemId;
    }
}