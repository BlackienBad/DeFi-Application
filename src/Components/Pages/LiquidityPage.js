import React, {useState, useEffect} from 'react';
import Web3 from 'web3';
import './LiquidityPage.css';
import FaucetButton from '../FaucetButton.js';
import LiquidityPoolCard from '../LiquidityPoolCard.js';
import Doge from '../../abis/Doge.json';
import Elon from '../../abis/Elon.json';
import Snoop from '../../abis/Snoop.json';

const LiquidityPage = () => {
  const [account, setAccount] = useState(null);
  const [doge, setDoge] = useState();
  const [elon, setElon] = useState();
  const [snoop, setSnoop] = useState();
  const [balanceOfDoge, setBalanceOfDoge] = useState(0);
  const [balanceOfElon, setBalanceOfElon] = useState(0);
  const [balanceOfSnoop, setBalanceOfSnoop] = useState(0);
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
      const dogeToken = new web3.eth.Contract(Doge.abi, '0x1D3371dC80Ec16Cc79F17A56e41e9c3a5Fe45aEE')
      setDoge(dogeToken)
      const elonToken = new web3.eth.Contract(Elon.abi, '0xa396aDD4C60aF488e8d91fC46B14D71c0A7624Ec')
      setElon(elonToken)
      const snoopToken = new web3.eth.Contract(Snoop.abi, '0x6119c3A7229Fa835bfEFA3b089613bFD92578288')
      setSnoop(snoopToken)
      if(accounts[0] !== undefined){
        setBalanceOfDoge(await dogeToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfElon(await elonToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfSnoop(await snoopToken.methods.balanceOf(accounts[0]).call())
      }
      }
  const faucet1 = async () => {
    await doge.methods.faucet().send({from: account});
    setBalanceOfDoge(await doge.methods.balanceOf(account).call())
  }
  const faucet2 = async () => {
    await elon.methods.faucet().send({from: account});
    setBalanceOfElon(await elon.methods.balanceOf(account).call())
  }
  const faucet3 = async () => {
    await snoop.methods.faucet().send({from: account});
    setBalanceOfSnoop(await snoop.methods.balanceOf(account).call())
  }
  function swapFunction1(value){
    console.log(value)
  }
  function swapFunction2(value){
    console.log(value)
  }
  return (
    <div>
        <div class="grid-containerLiquidity">
          <div class="faucet">
            <div class="faucet-1"><FaucetButton buttonText="Faucet Doge" faucet={faucet1}/></div>
            <div class="faucet-2"><FaucetButton buttonText="Faucet Elon" faucet={faucet2}/></div>
            <div class="faucet-3"><FaucetButton buttonText="Faucet Snoop" faucet={faucet3}/></div>
          </div>
          <div class="liquidity-pool-1"><LiquidityPoolCard number="Elon/Doge" img="./images/elondoge.jpg" swapFunction={swapFunction1}/></div>
          <div class="liquidity-pool-2"><LiquidityPoolCard number="Snoop/Doge" img="./images/snoopdoge.jpg" swapFunction={swapFunction2}/></div>
        </div>
    </div>
  );
}

export default LiquidityPage;