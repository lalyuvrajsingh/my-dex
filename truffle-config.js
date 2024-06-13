const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = "your mnemonic here";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // You can add other networks here
  },
  compilers: {
    solc: {
      version: "0.8.20",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};

