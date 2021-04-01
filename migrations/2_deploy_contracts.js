const MintNFT = artifacts.require("MintNFT");

module.exports = async function(deployer) {
  await deployer.deploy(MintNFT);
};