import React from 'react'
import { Navbar } from '../components/Navbar'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import '../App.css';
import { Link } from 'react-router-dom';



const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);
//console.log(alchemy);
export const Home = () => {
    const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });
  
  return (
    <div>
        <Navbar/>
        <div className="content">
            <ForwardToInboxIcon sx={{ fontSize: 40, marginRight: 1 , color: 'black'}} />
            <Link to={`/blockinfo/${blockNumber}`}>
            <div >Block Number: {blockNumber}</div>
            </Link>
        </div>
    </div>
  )
}
