// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Importing the standard libraries for NFT (ERC721)
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
// A modifier that can prevent reentrancy during certain functions
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
// Importing utility libraries for using safe datatypes
import "@openzeppelin/contracts/utils/Counters.sol";

// The NFT contract is inheriting the ERC721URIStorage contract
// ERC721URIStorage provide option to add metadata in the NFT
contract NFTOps is ReentrancyGuard, IERC721Receiver {

    // Safe datatype, allow only increment/decrement operation
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    // Owner of Item
    // Used as intermediate represntation of original ownership
    struct Owner {
        address user;  // User crypto wallet address
        string uuid;  // User ID in backend server
        bytes16 mobileNo;  // Mobile no. of user
        string email;  // Email of user
    }
    
    // Metadata of item
    struct Item {
        IERC721 nft;  // NFT contract address
        uint256 tokenId;  // NFT token ID
        uint buyDate;  // Purchase date timestamp
        uint returnPeriod;  // Return period timestamp
        bool isClaimed;  // To check whether it is claimed or not
        string denyMsg;  // If denied then what the msg otherwise empty string
        Owner owner;  // Original owner of item
    }
    // itemId to Item mapping
    mapping(uint256 => Item) private _items;
    // tokenId to itemId mapping
    // Useful for checking whether token is already sold or not
    mapping(uint256 => uint256) private _isTransfered;

    // Event after soft transfer
    event softTransfered(
        bytes16 indexed mobileNo,  // Mobile no. of user
        uint256 itemId  // NFT Item ID
    );

    // Interface for any contract that wants to support safeTransfers from ERC721 asset contracts.
    function onERC721Received(address, address, uint256, bytes memory) public virtual override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    // Return the Item of `itemId`
    function getItem(uint256 itemId) public view returns (Item memory) {
        return _items[itemId];
    }

    // Transfer NFT to contract address instead of directly sending it to the user
    function softTransfer(IERC721 nft, uint256 tokenId, Owner memory to, uint buyDate, uint returnPeriod) public {
        require(_isTransfered[tokenId]==0,"Token already transfered to someone else");

        _itemIds.increment();
        uint256 newItemId = _itemIds.current();  // get new itemId

        nft.safeTransferFrom(msg.sender, address(this), tokenId); // Tranfer NFT to contract address

        _items[newItemId] = Item(
            nft,
            tokenId,
            buyDate,
            returnPeriod,
            false,
            "",
            to
        ); // Add new entry into _items mapping
        // Update itemId mapped with tokenId
        _isTransfered[tokenId] = newItemId;

        emit softTransfered(
            to.mobileNo,
            newItemId
        ); // emit and return softTransfered event
    }
}