const Swap = artifacts.require("Swap");

module.exports = function (deployer) {
  const fee = 15; // 0.15% fee in basis points
  deployer.deploy(Swap, fee);
};

