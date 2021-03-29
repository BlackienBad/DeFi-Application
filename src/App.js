import {useState, useEffect} from 'react';
import Web3 from 'web3';
import Example from './Components/NavbarSite.js';
import LiquidityPage from './Components/Pages/LiquidityPage.js';
import NFTPage from './Components/Pages/NFTPage.js';
import Doge from './abis/Doge.json';
import Elon from './abis/Elon.json';
import Snoop from './abis/Snoop.json';

import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
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

    // Doge : 0x1D3371dC80Ec16Cc79F17A56e41e9c3a5Fe45aEE
    // Elon : 0xa396aDD4C60aF488e8d91fC46B14D71c0A7624Ec
    // Snoop : 0x6119c3A7229Fa835bfEFA3b089613bFD92578288
    // ElonDoge : 0x42C5a0ACB39a9f1D6836f61d35f9383665a07089
    // SnoopDoge : 0x3b9f544634e7930eB151Cf842B0684B6d1c4fCEd
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

  return (
    <div className="App">
      <Router>
        <Example account={account}/>
          <Route path="/nft" component={NFTPage}></Route>
          <Route path="/" exact component={LiquidityPage}></Route>
      </Router>
    </div>
  );
}

export default App;
