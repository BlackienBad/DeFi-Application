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
  const [doge, setDoge] = useState();
  const [elon, setElon] = useState();
  const [snoop, setSnoop] = useState();
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

    // Doge : 0x1D3371dC80Ec16Cc79F17A56e41e9c3a5Fe45aEE
    // Elon : 0xa396aDD4C60aF488e8d91fC46B14D71c0A7624Ec
    // Snoop : 0x6119c3A7229Fa835bfEFA3b089613bFD92578288
    // TokenLP1 : 0xC273a3f9cD94eA320a34Ba2aE0b0E17323f8f06f
    // TokenLP2 : 0xacb030B05E074181405c065f03A2FACc7b6931A2
    // ElonDogeLP : 0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628
    // SnoopDogeLP : 0xaE2f951BbB7E2A9B4356B4934884D078654d11B9
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
      const elonToken = new web3.eth.Contract(Elon.abi, '0xa396aDD4C60aF488e8d91fC46B14D71c0A7624Ec')
      const snoopToken = new web3.eth.Contract(Snoop.abi, '0x6119c3A7229Fa835bfEFA3b089613bFD92578288')
      const tokenLP1 = new web3.eth.Contract(TokenLP1.abi, '0xC273a3f9cD94eA320a34Ba2aE0b0E17323f8f06f')
      const tokenLP2 = new web3.eth.Contract(TokenLP2.abi, '0xacb030B05E074181405c065f03A2FACc7b6931A2')
      if(accounts[0] !== undefined){
        setBalanceOfDoge(await dogeToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfElon(await elonToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfSnoop(await snoopToken.methods.balanceOf(accounts[0]).call())
        setBalanceOfElonDoge(await tokenLP1.methods.balanceOf(accounts[0]).call())
        setBalanceOfSnoopDoge(await tokenLP2.methods.balanceOf(accounts[0]).call())
        setStakedOfElonDoge(await dogeToken.methods.balanceOf('0x4d4201de2e35A10D73Be5Daa4CE4a7c4eE2E9628').call())
        setStakedOfSnoopDoge(await dogeToken.methods.balanceOf('0xaE2f951BbB7E2A9B4356B4934884D078654d11B9').call())
        }
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
