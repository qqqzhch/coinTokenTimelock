var TokenPresale = artifacts.require("TokenPresale");

module.exports = function(deployer) {
  deployer.deploy(TokenPresale,
  '0x3b9170c9fa9e12cce546d5681c0be6f1a63eefda',//_investorWallet
  '0x774efe189ddd5cd476f7611d44a61984feaa93a8',//_icoWallet
  '0x22c823b0aa08b901eea8ea228790ccb389b6208a',//_teamWallet
  '0x8731c19d6041295cab8be3b9985bfd6cc9e9d2ba' //_fundWallet

   );
};
