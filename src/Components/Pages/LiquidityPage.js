import React from 'react';
import './LiquidityPage.css';
import FaucetButton from '../FaucetButton.js';
import LiquidityPoolCard from '../LiquidityPoolCard.js';

const LiquidityPage = () => {
  function faucet1(){
    console.log("faucet1")
  }
  function faucet2(){
    console.log("faucet2")
  }
  function faucet3(){
    console.log("faucet3")
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
            <div class="faucet-1"><FaucetButton buttonText="Faucet 1" faucet={faucet1}/></div>
            <div class="faucet-2"><FaucetButton buttonText="Faucet 2" faucet={faucet2}/></div>
            <div class="faucet-3"><FaucetButton buttonText="Faucet 3" faucet={faucet3}/></div>
          </div>
          <div class="liquidity-pool-1"><LiquidityPoolCard img="./images/elondoge.jpg" swapFunction={swapFunction1}/></div>
          <div class="liquidity-pool-2"><LiquidityPoolCard img="./images/snoopdoge.jpg" swapFunction={swapFunction2}/></div>
        </div>
    </div>
  );
}

export default LiquidityPage;