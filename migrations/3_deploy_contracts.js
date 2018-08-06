var LambdaCoinPresale = artifacts.require("./LambdaCoinPresale.sol");

module.exports = function(deployer) {
  deployer.deploy(LambdaCoinPresale,
  '0x13f8afada9ba7d7c83447203730d0f05e9bd0da5',//_investorWallet
  '0xe86246b754bc1b10c76307a0c2c6aeb34e79543f',//_icoWallet
  '0x76cefedd749402591e8484eba80140be8c663383',//_teamWallet
  '0x06e183579e29eba5fe2e4ceb5483af10d5d318cb' //_fundWallet

   );
};
