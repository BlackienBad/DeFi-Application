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

const LiquidityPage = () => {
  const [account, setAccount] = useState(null);
  const [doge, setDoge] = useState();
  const [elon, setElon] = useState();
  const [snoop, setSnoop] = useState();
  const [tokenLP1, setTokenLP1] = useState();
  const [tokenLP2, setTokenLP2] = useState();
  const [elonDoge, setElonDoge] = useState();
  const [snoopDoge, setSnoopDoge] = useState();
  const [balanceOfDoge, setBalanceOfDoge] = useState(0);
  const [balanceOfElon, setBalanceOfElon] = useState(0);
  const [balanceOfSnoop, setBalanceOfSnoop] = useState(0);
  const [balanceOfElonDoge, setBalanceOfElonDoge] = useState(0);
  const [balanceOfSnoopDoge, setBalanceOfSnoopDoge] = useState(0);
  const [stakedOfElonDoge, setStakedOfElonDoge] = useState(0);
  const [stakedOfSnoopDoge, setStakedOfSnoopDoge] = useState(0);
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
      setDoge(dogeToken);
      const elonToken = new web3.eth.Contract(Elon.abi, '0xa396aDD4C60aF488e8d91fC46B14D71c0A7624Ec')
      setElon(elonToken);
      const snoopToken = new web3.eth.Contract(Snoop.abi, '0x6119c3A7229Fa835bfEFA3b089613bFD92578288')
      setSnoop(snoopToken);
      const token1 = new web3.eth.Contract(TokenLP1.abi, '0xC273a3f9cD94eA320a34Ba2aE0b0E17323f8f06f')
      setTokenLP1(token1)
      const token2 = new web3.eth.Contract(TokenLP2.abi, '0xacb030B05E074181405c065f03A2FACc7b6931A2')
      setTokenLP2(token2)
      const elonDogeToken = new web3.eth.Contract(ElonDogeLP.abi, '0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628')
      setElonDoge(elonDogeToken)
      const snoopDogeToken = new web3.eth.Contract(SnoopDogeLP.abi, '0xaE2f951BbB7E2A9B4356B4934884D078654d11B9')
      setSnoopDoge(snoopDogeToken)
      if(accounts[0] !== undefined){
        setBalanceOfDoge(await dogeToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfElon(await elonToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfSnoop(await snoopToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfElonDoge(await token1.methods.balanceOf(accounts[0]).call())
        setBalanceOfSnoopDoge(await token2.methods.balanceOf(accounts[0]).call())
        setStakedOfElonDoge(await dogeToken.methods.balanceOf('0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628').call())
        setStakedOfSnoopDoge(await dogeToken.methods.balanceOf('0xaE2f951BbB7E2A9B4356B4934884D078654d11B9').call())
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
  const swapFunction1 = async (value) => {
    await doge.methods.approve('0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628', value).send({from:account});
    await elon.methods.approve('0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628', value).send({from:account});
    await elonDoge.methods.stakeTokens(value).send({from: account});
  }
  const swapFunction2 = async (value) => {
    await doge.methods.approve('0xaE2f951BbB7E2A9B4356B4934884D078654d11B9', value).send({from:account});
    await snoop.methods.approve('0xaE2f951BbB7E2A9B4356B4934884D078654d11B9', value).send({from:account});
    await snoopDoge.methods.stakeTokens(value).send({from: account});
  }
  const unswapFunction1 = async () => {
    
    await tokenLP1.methods.approve('0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628', balanceOfElonDoge).send({from:account});
    await elonDoge.methods.unstakeTokens().send({from: account});
  }
  const unswapFunction2 = async (value) => {
    await tokenLP2.methods.approve('0xaE2f951BbB7E2A9B4356B4934884D078654d11B9', balanceOfSnoopDoge).send({from:account});
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