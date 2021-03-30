import {useState, useEffect} from 'react';
import Web3 from 'web3';
import Example from './Components/NavbarSite.js';
import LiquidityPage from './Components/Pages/LiquidityPage.js';
import NFTPage from './Components/Pages/NFTPage.js';
import Doge from './abis/Doge.json';
import Elon from './abis/Elon.json';
import Snoop from './abis/Snoop.json';
import BalancePage from './Components/Pages/BalancePage.js';
import TokenLP1 from './abis/TokenLP1.json';
import TokenLP2 from './abis/TokenLP2.json';
import ElonDogeLP from './abis/ElonDogeLP.json';
import SnoopDogeLP from './abis/SnoopDogeLP.json';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  const [account, setAccount] = useState(null);
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
    }
  return (
    <div className="App">
      <Router>
        <Example account={account}/>
          <Route path="/nft" component={NFTPage}></Route>
          <Route path="/balance" component={BalancePage}></Route> 
          <Route path="/" exact component={LiquidityPage}></Route>
      </Router>
    </div>
  );
}

export default App;
