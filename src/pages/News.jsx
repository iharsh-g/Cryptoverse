import React, { useEffect, useState } from 'react'
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi'
import NewsCard from '../components/NewsCard';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Spinner from '../components/Spinner'

function News({simplified}) {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const {data: cryptosNewsList, isFetching} = useGetCryptosNewsQuery({newsCategory, count: simplified ? 6 : 12});
    const [cryptosNews, setCryptosNews] = useState([]);
    const {data} = useGetCryptosQuery(100);

    useEffect(() => {
        setCryptosNews(cryptosNewsList?.value);
    }, [cryptosNewsList]);

    if(isFetching) return <Spinner/>

    return (
        <div className='bg-gray-100 dark:bg-neutral-950 min-h-[617px]'>
        {
            !simplified && 
            <div className='pt-5 px-5 xs:w-[500px] mx-auto'>
                <label htmlFor="category" className=' dark:text-white pr-2'>Select a Crypto: </label>
                <select id="category" value={newsCategory} onChange={(event) => setNewsCategory(event.target.value)} className="xs:py-2 w-[200px] px-3 rounded-full">
                    <option value="Cryptocurrency">Cryptocurrency</option>
                    {
                        data?.data?.coins?.map((currency, i) => (
                            <option key={i} value={currency.name}>
                                {currency.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        }
        <div className='grid md:grid-cols-3 grid-cols-1 gap-x-3 gap-y-3 items-center bg-gray-100 dark:bg-neutral-950 px-5 py-3'>
            {
                cryptosNews?.map((news, i) => (
                    <NewsCard news={news} key={i}/>
                ))
            }
        </div>
        </div>
    )
}

export default News