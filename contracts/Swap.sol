pragma solidity ^0.8.0;

contract Swap {
    address public owner;
    uint256 public fee; // fee in basis points (1 basis point = 0.01%)

    event SwapExecuted(address indexed user, address tokenA, address tokenB, uint256 amountA, uint256 amountB);

    constructor(uint256 _fee) {
        owner = msg.sender;
        fee = _fee;
    }

    function swap(address tokenA, address tokenB, uint256 amountA, uint256 amountB) external {
        // Add logic to transfer tokens between users
        // Emit SwapExecuted event
        emit SwapExecuted(msg.sender, tokenA, tokenB, amountA, amountB);
    }

    function setFee(uint256 _fee) external {
        require(msg.sender == owner, "Only owner can set the fee");
        fee = _fee;
    }
}
