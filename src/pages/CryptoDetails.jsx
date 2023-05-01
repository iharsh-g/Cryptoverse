import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined } from '@ant-design/icons';
import millify from 'millify';
import LineChart from '../components/LineChart'
import Spinner from '../components/Spinner'

function CryptoDetails() {
    const { coinId } = useParams();
    const [timeperiod, setTimeperiod] = useState('7d');
    const {data, isFetching} = useGetCryptoDetailsQuery(coinId);
    const cryptoDetails = data?.data?.coin;

    if(isFetching) return <Spinner/>

    const time = ['3h', '24h', '7d', '30d','3m', '1y',  '3y', '5y'];

    const stats = [
        { title: 'Price to USD',              value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,                           icon: <DollarCircleOutlined /> },
        { title: 'Rank',                      value: cryptoDetails?.rank,                                                                    icon: <NumberOutlined /> },
        { title: 'Market Cap',                value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`,                   icon: <DollarCircleOutlined /> },
        { title: 'All-time-high (daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
    ];

    const genericStats = [
        { title: 'Number Of Markets',   value: cryptoDetails?.numberOfMarkets,                                                           icon: <FundOutlined /> },
        { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges,                                                         icon: <MoneyCollectOutlined /> },
        { title: 'Aprroved Supply',     value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,                  icon: <ExclamationCircleOutlined /> },
        { title: 'Total Supply',        value: `$ ${cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)}`,             icon: <ExclamationCircleOutlined /> },
        { title: 'Circulating Supply',  value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
    ];
    
    return (
        <div className='w-[100%] bg-gray-50 dark:bg-neutral-950 p-5'>
            <div className='w-[100%] flex flex-col justify-center items-center'>
                <p className='xs:text-4xl text-2xl font-bold text-blue-500'>{data?.data?.coin?.name} ({data?.data?.coin.symbol}) Price</p>
                <p className='mt-3 text-gray-400'>{cryptoDetails.name} live price in US Dollar (USD). View value statistics, market cap and supply.</p>
            </div>

            <select value={timeperiod} onChange={(e) => setTimeperiod(e.target.value)} className='xs:w-[100px] w-[70px] xs:py-2 px-2 mt-5 rounded-full'>
                {
                    time.map((date) => <option key={date} value={date}>{date}</option>)
                }
            </select>

            <div className='w-[95%] my-5 sm:ml-5 dark:text-white'>
                <LineChart currentPrice={millify(cryptoDetails?.price)} coinName={cryptoDetails?.name} coinId={coinId} timePeriod={timeperiod}/>
            </div>

            <div className='grid sm:grid-cols-2 grid-cols-1 gap-5 mt-10 dark:text-white'>

                {/* Coin Value Stats */}
                <div className='flex flex-col'>
                    <p className='font-semibold text-blue-500 xs:text-2xl text-lg'>{cryptoDetails.name} Value Statistics</p>
                    <p className="xs:text-base text-sm">An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>

                    <div className='mt-3 flex flex-col gap-5'>
                        {
                            stats.map(({title, value, icon}, i) => (
                                <div className='flex justify-between bg-white dark:bg-neutral-800 py-3 px-4 rounded-lg' key={i}>
                                    <div className='flex gap-3 items-center'>
                                        {icon}
                                        <p>{title}</p>
                                    </div>

                                    <p>{value}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* Other Stats info */}
                <div className='flex flex-col'>
                    <p className=' font-semibold text-blue-500 xs:text-2xl text-lg'>Other Stats Info</p>
                    <p className="xs:text-base text-sm">An overview showing the statistics of {cryptoDetails.name}, such as the base and quote currency, the rank, and trading volume.</p>

                    <div className='mt-3 flex flex-col gap-5'>
                        {
                            genericStats.map(({title, value, icon}, i) => (
                                <div className='flex justify-between bg-white dark:bg-neutral-800 py-3 px-4 rounded-lg' key={i}>
                                    <div className='flex gap-3 items-center'>
                                        {icon}
                                        <p>{title}</p>
                                    </div>

                                    <p>{value}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className='grid sm:grid-cols-2 grid-cols-1 my-4 mt-10 gap-10 dark:text-white'>
                <div className='flex flex-col gap-3'>
                    <p className='xs:text-3xl text-xl text-blue-500 font-bold'>What is {cryptoDetails.name}?</p>
                    <p>{cryptoDetails.description}</p>
                </div>

                <div>
                    <p className='xs:text-2xl text-lg font-bold'>{cryptoDetails.name} Links</p>
                    <div className='flex flex-col gap-5 mt-3'>
                        {
                            cryptoDetails?.links.map((link) => (
                                <div className='flex justify-between' key={link.name}>
                                    <p className='xs:text-lg text-base font-semibold'>{link.type}</p>
                                    <a href={link.url} target='_blank' rel='noreferrer' className='text-blue-500 font-semibold'>{link.name}</a>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CryptoDetails