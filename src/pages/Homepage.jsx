import React from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import { useNavigate } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies'
import News from './News';
import Spinner from '../components/Spinner';

function Homepage() {
  const navigate = useNavigate();
  const {data, isFetching} = useGetCryptosQuery(10);

  var Simplfy1 = true, Simplfy2 = true;

  const globalStats = data?.data?.stats;

  if(isFetching) return <Spinner/>

  function showMoreCryptoHandler() {
    Simplfy1 = false;
    navigate("/cryptocurrencies");
  }

  function showMoreNewsHandler() {
    Simplfy2 = false;
    navigate("/news");
  }

  return (
    <div className='bg-gray-100 dark:bg-neutral-950'>
      <h1 className='md:text-3xl text-xl font-bold pl-5 pt-5 dark:text-white'>Global Crypto Stats</h1>

      <div className='grid grid-cols-2 mt-5 gap-5 w-[100%] pl-5'>

        <div className='flex flex-col gap-1'>
          <p className=' text-gray-400 md:text-xl text-sm'>Total Cryptocurrencies</p>
          <p className='md:text-2xl text-lg dark:text-white'>{globalStats?.total}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className=' text-gray-400 md:text-xl text-sm'>Total Exchanges</p>
          <p className='md:text-2xl text-lg dark:text-white'>{globalStats?.totalExchanges}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className=' text-gray-400 md:text-xl text-sm'>Total Market Cap</p>
          <p className='md:text-2xl text-lg dark:text-white'>{millify(globalStats?.totalMarketCap)}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className=' text-gray-400 md:text-xl text-sm'>Total 24h Volume</p>
          <p className='md:text-2xl text-lg dark:text-white'>{millify(globalStats?.total24hVolume)}</p>
        </div>

        <div className='flex flex-col gap-1'>
          <p className=' text-gray-400 md:text-xl text-sm'>Total Markets</p>
          <p className='md:text-2xl text-lg dark:text-white'>{millify(globalStats?.totalMarkets)}</p>
        </div>
      </div>

      <div className='w-[100%] justify-between flex mt-7 px-5 items-center'>
        <p className='md:text-3xl xs:text-xl text-sm font-bold dark:text-white'>Top 10 Cryptocurrencies in the world</p>
        <p className='md:text-xl xs:text-sm text-[10px] text-blue-500 font-semibold cursor-pointer' onClick={showMoreCryptoHandler}>Show More</p>
      </div>

      <Cryptocurrencies simplified = {Simplfy1}/>

      <div className='w-[100%] justify-between flex mt-5 px-5 items-center'>
        <p className='md:text-3xl xs:text-xl font-bold dark:text-white'>Latest Crypto News</p>
        <p className='md:text-xl xs:text-sm text-[10px] text-blue-500 font-semibold cursor-pointer' onClick={showMoreNewsHandler}>Show More</p>
      </div>

      <News simplified = {Simplfy2}/>
    </div>
  )
}

export default Homepage