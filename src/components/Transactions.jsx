import React, { useState, useEffect } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import "./Transactions.css"
import { Navbar } from './Navbar';
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const Transactions = () => {
  const location = useLocation();
  const queryObject = new URLSearchParams(location.search);
  const block = queryObject.get('block');
  console.log("trans " + typeof block);

  const [tObject, setTObject] = useState();

  useEffect(() => {
    async function getTransactions() {
      const tx = await alchemy.core.getBlockWithTransactions(parseInt(block));
      setTObject(tx);
    }
    getTransactions();
  }, []);

  console.log(tObject && tObject.transactions[0]);

  return (
    <div className="transactions-page">
      <Navbar/>
      <h2>Transactions</h2>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Hash</th>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {tObject &&
            tObject.transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <Link to={`/transaction?value=${transaction.hash}`} className="transaction-link">
                    {transaction.hash.slice(0, 10)}...
                  </Link>
                </td>
                <td>{transaction.from.slice(0, 10)}...</td>
                <td>{transaction.to.slice(0, 10)}...</td>
                <td>{parseInt(transaction.value._hex, 16) / 1000000000} Gwei</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
