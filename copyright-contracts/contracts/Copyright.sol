// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721Enumerable.sol";

contract Copyright is ERC721Enumerable {
    string public base;
    mapping(uint256 => string) public cids;

    constructor(string memory name, string memory symbol, string memory _base) ERC721(name, symbol) {
        base = _base;
    }

    function _baseURI() internal view override returns (string memory) {
        return base;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);

        string memory baseURI = _baseURI();
        string memory cid = cids[tokenId];
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, cid)) : "";
    }

    function mint(uint256 tokenId, string memory cid) public {
        _mint(msg.sender, tokenId);
        cids[tokenId] = cid;
    }
}
