import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import './LiquidityPage.css';
import FaucetButton from '../FaucetButton.js';
import LiquidityPoolCard from '../LiquidityPoolCard.js';
import Doge from '../../abis/Doge.json';
import Elon from '../../abis/Elon.json';
import Snoop from '../../abis/Snoop.json';
import TokenLP1 from '../../abis/TokenLP1.json';
import TokenLP2 from '../../abis/TokenLP2.json';
import ElonDogeLP from '../../abis/ElonDogeLP.json';
import SnoopDogeLP from '../../abis/SnoopDogeLP.json';
import {dogeAddress, elonAddress, snoopAddress, tokenLP1Address, tokenLP2Address, elonDogeAddress, snoopDogeAddress} from '../../Constants/ContractAddresses.js';

const LiquidityPage = () => {
  const [account, setAccount] = useState(null);
  const [doge, setDoge] = useState();
  const [elon, setElon] = useState();
  const [snoop, setSnoop] = useState();
  const [tokenLP1, setTokenLP1] = useState();
  const [tokenLP2, setTokenLP2] = useState();
  const [elonDoge, setElonDoge] = useState();
  const [snoopDoge, setSnoopDoge] = useState();
  const [balanceOfElonDoge, setBalanceOfElonDoge] = useState(0);
  const [balanceOfSnoopDoge, setBalanceOfSnoopDoge] = useState(0);
  useEffect(() => {
		loadWeb3();
    loadRopstenData();
	},[]);

    const loadWeb3 = async () => {
        if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        }
        else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    const loadRopstenData = async () => {
      const web3 = window.web3
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      const dogeToken = new web3.eth.Contract(Doge.abi, dogeAddress)
      setDoge(dogeToken);
      const elonToken = new web3.eth.Contract(Elon.abi, elonAddress)
      setElon(elonToken);
      const snoopToken = new web3.eth.Contract(Snoop.abi, snoopAddress)
      setSnoop(snoopToken);
      const token1 = new web3.eth.Contract(TokenLP1.abi, tokenLP1Address)
      setTokenLP1(token1)
      const token2 = new web3.eth.Contract(TokenLP2.abi, tokenLP2Address)
      setTokenLP2(token2)
      const elonDogeToken = new web3.eth.Contract(ElonDogeLP.abi, elonDogeAddress)
      setElonDoge(elonDogeToken)
      const snoopDogeToken = new web3.eth.Contract(SnoopDogeLP.abi, snoopDogeAddress)
      setSnoopDoge(snoopDogeToken)
      if(accounts[0] !== undefined){
        setBalanceOfElonDoge(await token1.methods.balanceOf(accounts[0]).call())
        setBalanceOfSnoopDoge(await token2.methods.balanceOf(accounts[0]).call())
        }
      }
  const faucet1 = async () => {
    await doge.methods.faucet().send({from: account});
  }
  const faucet2 = async () => {
    await elon.methods.faucet().send({from: account});
  }
  const faucet3 = async () => {
    await snoop.methods.faucet().send({from: account});
  }
  const swapFunction1 = async (value) => {
    await doge.methods.approve(elonDogeAddress, (value * 10**18).toString()).send({from:account});
    await elon.methods.approve(elonDogeAddress, (value * 10**18).toString()).send({from:account});
    await elonDoge.methods.stakeTokens(value).send({from: account});
  }
  const swapFunction2 = async (value) => {
    await doge.methods.approve(snoopDogeAddress, (value * 10**18).toString()).send({from:account});
    await snoop.methods.approve(snoopDogeAddress, (value * 10**18).toString()).send({from:account});
    await snoopDoge.methods.stakeTokens(value).send({from: account});
  }
  const unswapFunction1 = async () => {
    
    await tokenLP1.methods.approve(elonDogeAddress, balanceOfElonDoge).send({from:account});
    await elonDoge.methods.unstakeTokens().send({from: account});
  }
  const unswapFunction2 = async () => {
    await tokenLP2.methods.approve(snoopDogeAddress, balanceOfSnoopDoge).send({from:account});
    await snoopDoge.methods.unstakeTokens().send({from: account});
  }
  return (
    <div>
        <div class="grid-containerLiquidity">
          <div class="faucet">
            <div class="faucet-1"><FaucetButton buttonText="Faucet Doge" faucet={faucet1}/></div>
            <div class="faucet-2"><FaucetButton buttonText="Faucet Elon" faucet={faucet2}/></div>
            <div class="faucet-3"><FaucetButton buttonText="Faucet Snoop" faucet={faucet3}/></div>
          </div>
          <div class="liquidity-pool-1"><LiquidityPoolCard number="Elon/Doge" img="./images/elondoge.jpg" swapFunction={swapFunction1} unswapFunction={unswapFunction1}/></div>
          <div class="liquidity-pool-2"><LiquidityPoolCard number="Snoop/Doge" img="./images/snoopdoge.jpg" swapFunction={swapFunction2} unswapFunction={unswapFunction2}/></div>
        </div>
    </div>
  );
}

export default LiquidityPage;