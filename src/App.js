import logo from './logo.svg';
import './App.css';
import Example from './Components/NavbarSite.js';

function App() {
  return (
    <div className="App">
      <Example />
      <div className="grid-container">
        <div className="faucet-1">a</div>
        <div className="faucet-2">b</div>
        <div className="faucet-3">c</div>
        <div className="faucet-4">d</div>
        <div className="liquidity-pool-1">e</div>
        <div className="liquidity-pool-2">f</div>
      </div>
    </div>
  );
}

export default App;
