'use client';
import { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
import axios from 'axios';
import { FaEthereum } from 'react-icons/fa';
import { SiBitcoin } from 'react-icons/si';

const Swap = ({ provider }) => {
  const [tokenA, setTokenA] = useState('ethereum');
  const [tokenB, setTokenB] = useState('wrapped-bitcoin');
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const fetchConversionRate = async (fromToken, toToken) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${fromToken},${toToken}&vs_currencies=usd`);
    const fromTokenPrice = response.data[fromToken].usd;
    const toTokenPrice = response.data[toToken].usd;
    return toTokenPrice / fromTokenPrice;
  };

  const handleAmountAChange = async (e) => {
    const value = e.target.value;
    setAmountA(value);
    if (value && tokenA && tokenB) {
      const rate = await fetchConversionRate(tokenA, tokenB);
      setAmountB((value * rate).toFixed(2));
    }
  };

  const handleAmountBChange = async (e) => {
    const value = e.target.value;
    setAmountB(value);
    if (value && tokenA && tokenB) {
      const rate = await fetchConversionRate(tokenB, tokenA);
      setAmountA((value * rate).toFixed(2));
    }
  };

  const handleSwap = async () => {
    if (!provider) {
      alert('Wallet is not connected!');
      return;
    }

    const signer = provider.getSigner();

    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [
      // Add the ABI of your smart contract here
    ];
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      const tx = await contract.swap(tokenA, tokenB, ethers.utils.parseUnits(amountA, 18), ethers.utils.parseUnits(amountB, 18));
      await tx.wait();
      alert('Swap successful!');

      await axios.post('http://localhost:3001/swap', {
        user: await signer.getAddress(),
        tokenA,
        tokenB,
        amountA,
        amountB,
      });
    } catch (error) {
      console.error(error);
      alert('Swap failed!');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col mt-9 p-4 text-white">
      <h1 className="text-4xl relative -z-20 text-gray-400 mb-3">Swap with lower fees!</h1>
      <div className='bg-gray-200 p-3 shadow-xl rounded-3xl'>
        <div className="bg-gray-100 text-black wave-effect p-6 border border-black border-opacity-10 rounded-3xl shadow-lg w-96">
          <div className=''>
            <div className="border bg-gray-100 shadow-sm p-2 rounded-2xl ">
              <label className="px-1 flex items-center text-md gap-1 font-medium mb-2">Sell
                <FaEthereum className={tokenA === 'ethereum' ? "inline-block" : "hidden"} />
                <SiBitcoin className={tokenA === 'wrapped-bitcoin' ? "inline-block" : "hidden"} />
              </label>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <input
                  className="bg-transparent outline-none text-lg flex-1"
                  placeholder="1.0"
                  value={amountA}
                  onChange={handleAmountAChange}
                />
                <select
                  className="bg-transparent outline-none text-lg ml-2"
                  value={tokenA}
                  onChange={(e) => setTokenA(e.target.value)}
                >
                  <option value="ethereum">
                    <FaEthereum className="inline-block mr-1" /> ETH
                  </option>
                  <option value="wrapped-bitcoin">
                    <SiBitcoin className="inline-block mr-1" /> WBTC
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-1">
            <span className="text-xl">↓</span>
          </div>
          <div className="">
            <div className="border bg-gray-100 shadow-sm mb-4 p-2 rounded-2xl">
              <label className="px-2 flex items-center text-md gap-1 font-medium mb-2">Buy
                <FaEthereum className={tokenB === 'ethereum' ? "inline-block" : "hidden"} />
                <SiBitcoin className={tokenB === 'wrapped-bitcoin' ? "inline-block" : "hidden"} />
              </label>
              <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                <input
                  className="bg-transparent outline-none text-lg flex-1"
                  placeholder="0.0"
                  value={amountB}
                  onChange={handleAmountBChange}
                />
                <select
                  className="bg-transparent outline-none text-lg ml-2"
                  value={tokenB}
                  onChange={(e) => setTokenB(e.target.value)}
                >
                  <option value="wrapped-bitcoin">
                    <SiBitcoin className="inline-block mr-1" /> WBTC
                  </option>
                  <option value="ethereum">
                    <FaEthereum className="inline-block mr-1" /> ETH
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className='bg-gray-200 p-2 shadow-xl rounded-2xl'>
            <button
              className="bg-black shadow-lg hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg w-full"
              onClick={handleSwap}
            >
              Swap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swap;