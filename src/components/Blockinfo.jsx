import React, { useEffect, useState } from 'react';
import { Network, Alchemy } from 'alchemy-sdk';
import { Navbar } from './Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './Blockinfo.css';


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

export const Blockinfo = () => {
  const { blockNumber } = useParams();
  const [block, setBlock] = useState();

  useEffect(() => {
    async function getBlockInfo() {
      const blockData = await alchemy.core.getBlock(parseInt(blockNumber));
      setBlock(blockData);
    }

    getBlockInfo();
  }, [blockNumber]);

  return (
    <div>
      <Navbar />
      <div className="block-info-container">
        {block && (
          <>
            <h2>Block Information</h2>
            <div>
              <p>
                <strong>Block Hash:</strong> {block.hash}
              </p>
              <p>
                <strong>Block Height:</strong> {block.number}
              </p>
              <p>
                <strong>Number of Transactions:</strong> {block.transactions.length}
              </p>
              <p>
                <strong>Gas Limit:</strong> {parseInt(block.gasLimit._hex, 16)}
              </p>
              <p>
                <strong>Gas Used:</strong> {parseInt(block.gasUsed._hex, 16)},{' '}
                {((parseInt(block.gasUsed._hex, 16)) / (parseInt(block.gasLimit._hex, 16))) * 100}%
              </p>
              <p>
                <strong>Base Fee per Gas:</strong> {parseInt(block.baseFeePerGas._hex) / 1000000000} Gwei
              </p>
              <Link to={`/transactions?block=${blockNumber}`} className="view-transactions-link">
                View Transactions
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
