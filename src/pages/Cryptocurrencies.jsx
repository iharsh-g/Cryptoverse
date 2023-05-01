import React, { useEffect, useState } from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Card from '../components/Card';
import Spinner from '../components/Spinner'

function Cryptocurrencies({simplified}) {
  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState([]);
  const {data: cryptoList, isFetching} = useGetCryptosQuery(count);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredList = cryptoList?.data?.coins.filter((coin) => coin?.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptos(filteredList);
  }, [cryptoList, searchTerm])

  if(isFetching) return <Spinner/>

  return (
    <div className='bg-gray-100 min-h-[617px] dark:bg-neutral-950'>
      {
        !simplified && 
        <div className='md:w-[500px] px-5 mx-auto pt-5'>
          <input type='text' placeholder='Search Coin...' className='w-[100%] py-3 px-5 rounded-full' onChange={(e) => setSearchTerm(e.target.value)}></input>
        </div>
      }
      <div className='grid md:grid-cols-4 xs:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4 bg-gray-100 dark:bg-neutral-950 items-center px-5 py-3'>
        {
          cryptos?.length === 0 ? <div className='xl:min-h-[500px] xl:w-[1200px] flex items-center justify-center border border-black'> <p className='dark:text-white xs:text-2xl'>No Coin Found</p></div> :
          cryptos?.map((currency) => (
            <Card currency={currency} key={currency.uuid}/>
          ))
        }
      </div>
    </div>
  )
}

export default Cryptocurrencies