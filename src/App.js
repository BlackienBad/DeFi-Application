import Example from './Components/NavbarSite.js';
import LiquidityPage from './Components/Pages/LiquidityPage.js';
import NFTPage from './Components/Pages/NFTPage.js';

import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Example />
          <Route path="/nft" component={NFTPage}></Route>
          <Route path="/" exact component={LiquidityPage}></Route>
      </Router>
    </div>
  );
}

export default App;
