import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Blockinfo } from './components/Blockinfo';
import { Transactions } from './components/Transactions';
import { Network, Alchemy } from 'alchemy-sdk';
import { Transaction } from './components/Transaction';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/transaction" component={Transaction} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/blockinfo/:blockNumber" component={Blockinfo} />
        <Route path="/" render={() => <Home Alchemy={alchemy} />} />
      </Switch>
    </Router>
  );
}

export default App;
