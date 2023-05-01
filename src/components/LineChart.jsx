import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js';
import { useGetCryptoHistoryQuery } from '../services/cryptoApi';

ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement)

function LineChart({currentPrice, coinName, coinId, timePeriod}) {
    const coinPrice = [];
    const coinTimestamp = [];
    const { data: coinHistoryList, isFetching } = useGetCryptoHistoryQuery({coinId, timePeriod});
    const [coinHistory, setCoinHistory] = useState('');

    useEffect(() => {
        setCoinHistory(coinHistoryList);
    }, [timePeriod, coinHistoryList])

    if(isFetching) return (
      <div className='min-h-[500px] my-5 ml-5 flex justify-center items-center'>
        <div className='spinner'></div>
      </div>
    )


    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp * 1000).toLocaleDateString());
    }

    const data = {
        labels: coinTimestamp.reverse(),
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
    };

    return (
        <div className='w-[100%]'>
            <div className='flex justify-between mb-4 items-center'>
                <p className='sm:text-2xl xs:text-xl text-sm text-blue-500 font-semibold'>{coinName} Price Chart </p>
                <div className='flex gap-3 font-semibold'>
                    <p className='xs:text-base text-[8px]'>Change: {coinHistory?.data?.change}%</p>
                    <p className='xs:text-base text-[8px]'>Current {coinName} Price: $ {currentPrice}</p>
                </div>
            </div>

            <Line data={data} options={options}/>
        </div>
    )
}

export default LineChart;
