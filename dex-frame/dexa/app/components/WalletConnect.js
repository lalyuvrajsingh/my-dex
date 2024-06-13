'use client'
// import React, { useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FaUserCircle } from 'react-icons/fa';
import { shortenAddress } from './Utils';
import { Web3Provider } from '@ethersproject/providers';

const WalletConnect = ({ onConnect }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed!');
      return;
    }

    try {
      const provider = new Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
      setProvider(provider);

      if (onConnect) {
        onConnect(provider);
      }
    } catch (error) {
      console.error('Error connecting to wallet', error);
      alert('Error connecting to wallet');
    }
  };

  useEffect(() => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      const provider = new Web3Provider(window.ethereum);
      setProvider(provider);
      provider.getSigner().getAddress().then(setAccount);
    }
  }, []);

  return (
    <div className="flex items-center">
      {account ? (
        <div className='bg-gray-200 p-2 rounded-xl shadow-md'>
        <div className="flex items-center bg-gray-100 p-2 rounded-xl shadow-lg">
          <FaUserCircle className="text-2xl mr-1" />
          
          <p onClick={() => setAccount(null)} className="text-md">{shortenAddress(account)}</p>
          
          {/* <button onClick={() => setAccount(null)} className="bg-gray-100 text-white py-2 px-4 rounded ml-4">
            Disconnect
          </button> */}
        </div>
        </div>
      ) : (
        <div className='bg-gray-200 p-2 rounded-xl shadow-md'>
        <button onClick={connectWallet} className="bg-gray-100 text-black p-2 rounded-xl">
          Connect Wallet
        </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;