// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Swap is ReentrancyGuard {
    address public owner;
    uint256 public fee; // fee in basis points (1 basis point = 0.01%)

    event SwapExecuted(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);

    constructor(uint256 _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    function swap(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external nonReentrant {
        require(amountA > 0, "AmountA must be greater than zero");
        require(amountB > 0, "AmountB must be greater than zero");

        // Logic to transfer tokens (implement as needed)
        // Example:
        // IERC20(tokenA).transferFrom(msg.sender, address(this), amountA);
        // IERC20(tokenB).transfer(msg.sender, amountB);

        emit SwapExecuted(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    function setFee(uint256 _fee) external {
        require(msg.sender == owner, "Only owner can set the fee");
        fee = _fee;
    }
}
