var HDWalletProvider = require("truffle-hdwallet-provider");



var mnemonic = "tornado recall step small dragon before cheese false trade language ring engine";
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
       provider: function() {
         return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/**")
       },
       network_id: 3,
       gas: 5657674,//gas: 56576740,
       //消耗了近1.2个以太坊


       // gasPrice:23
     }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions : {
      currency: 'CHF',
      gasPrice: 21
    }
  }
};
