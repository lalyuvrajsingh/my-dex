const Swap = artifacts.require("Swap");

module.exports = function (deployer) {
    const fee = 10; // 0.1%
    deployer.deploy(Swap, fee);
};
