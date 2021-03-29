const Doge = artifacts.require("Doge");
const Elon = artifacts.require("Elon");
const Snoop = artifacts.require("Snoop");
const ElonDoge = artifacts.require("ElonDoge");
const SnoopDoge = artifacts.require("SnoopDoge");

module.exports = function(deployer) {
  deployer.deploy(ElonDoge);
  deployer.deploy(SnoopDoge);
};