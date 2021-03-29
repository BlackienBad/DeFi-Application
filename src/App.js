import './App.css';
import Example from './Components/NavbarSite.js';
import LiquidityPage from './Components/LiquidityPage.js';
import NFTPage from './Components/NFTPage.js';

import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Example />
        <Switch>
          <Route path="/nft" component={NFTPage}></Route>
          <Route path="/" exact component={LiquidityPage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
