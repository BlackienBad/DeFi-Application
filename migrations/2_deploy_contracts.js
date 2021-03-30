const TokenLP1 = artifacts.require("TokenLP1");
const TokenLP2 = artifacts.require("TokenLP2");
const ElonDogeLP = artifacts.require("ElonDogeLP");
const SnoopDogeLP = artifacts.require("SnoopDogeLP");

module.exports = async function(deployer) {
  await deployer.deploy(TokenLP1);
  const tokenLP1 = await TokenLP1.deployed();
  await deployer.deploy(TokenLP2);
  const tokenLP2 = await TokenLP2.deployed();
  await deployer.deploy(ElonDogeLP, '0x1D3371dC80Ec16Cc79F17A56e41e9c3a5Fe45aEE', '0xa396aDD4C60aF488e8d91fC46B14D71c0A7624Ec', tokenLP1.address);
  await deployer.deploy(SnoopDogeLP, '0x1D3371dC80Ec16Cc79F17A56e41e9c3a5Fe45aEE' , '0x6119c3A7229Fa835bfEFA3b089613bFD92578288', tokenLP2.address);
  await tokenLP1.faucet(ElonDogeLP.address, '1000000000000000000000');
  await tokenLP2.faucet(SnoopDogeLP.address, '1000000000000000000000');
};