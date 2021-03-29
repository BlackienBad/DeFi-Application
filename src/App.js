import './App.css';
import Example from './Components/NavbarSite.js';
import FaucetButton from './Components/FaucetButton.js';
import LiquidityPoolCard from './Components/LiquidityPoolCard.js';

function App() {
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
    <div className="App">
      <Example />
      <div className="grid-container">
        <div class="faucet">
          <div className="faucet-1"><FaucetButton buttonText="Faucet 1" faucet={faucet1}/></div>
          <div className="faucet-2"><FaucetButton buttonText="Faucet 2" faucet={faucet2}/></div>
          <div className="faucet-3"><FaucetButton buttonText="Faucet 3" faucet={faucet3}/></div>
        </div>
        <div className="liquidity-pool-1"><LiquidityPoolCard number="1" img="./images/elondoge.jpg" swapFunction={swapFunction1}/></div>
        <div className="liquidity-pool-2"><LiquidityPoolCard number="2" img="./images/snoopdoge.jpg" swapFunction={swapFunction2}/></div>
      </div>
    </div>
  );
}

export default App;
