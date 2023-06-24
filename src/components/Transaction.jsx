import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alchemy, Network } from 'alchemy-sdk';
import { Navbar } from './Navbar';
import './Transaction.css';
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const Transaction = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const value = searchParams.get('value');
  const [tx, setTx] = useState();

  useEffect(() => {
    async function getTransactionInfo() {
      let trans = await alchemy.core.getTransactionReceipt(value);
      setTx(trans);
    }
    getTransactionInfo();
  }, []);

  return (
    <div className="transaction-page">
      <Navbar />
      <div className="transaction-details">
        {tx && (
          <>
            <h2>Transaction Details</h2>
            <p>
              <span className="label">Transaction Hash:</span> {tx.transactionHash}
            </p>
            <p>
              <span className="label">From:</span> {tx.from}
            </p>
            <p>
              <span className="label">To:</span> {tx.to}
            </p>
            <p>
              <span className="label">Block Hash:</span> {tx.blockHash}
            </p>
            <p>
              <span className="label">Block Number:</span> {tx.blockNumber}
            </p>
            <p>
              <span className="label">Gas Used:</span> {parseInt(tx.cumulativeGasUsed._hex, 16)}
            </p>
            <p>
              <span className="label">Gas Price:</span> {parseInt(tx.effectiveGasPrice._hex, 16) / 1000000000} Gwei
            </p>
            <p>
              <span className="label">Transaction Fee:</span>{' '}
              {(parseInt(tx.effectiveGasPrice._hex, 16) / 1000000000) * parseInt(tx.cumulativeGasUsed._hex, 16)} Gwei
            </p>
          </>
        )}
      </div>
    </div>
  );
};
