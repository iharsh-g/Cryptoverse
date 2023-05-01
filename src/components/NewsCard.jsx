import moment from 'moment/moment'
import React from 'react'

function NewsCard({news}) {
  return (
    <a href={news.url} target='_blank' rel='noreferrer'>
        <div className=' bg-white dark:bg-neutral-800 flex flex-col gap-3 px-5 py-3 rounded-xl hover:scale-105 transition-all duration-300 ease-in
            hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:text-white hover:dark:shadow-[rgba(255,255,255,_0.4)_0px_30px_90px]'>
            <div className='flex gap-3 items-center'>
                <p className='font-semibold xs:text-[16px] text-[14px]'>{news.name}</p>
                <img src={news?.image?.thumbnail?.contentUrl} alt='Not Avai.' className='h-[100px] w-[100px] rounded-xl'></img>
            </div>

            <hr className='my-2'/>

            <p className='text-sm dark:text-gray-300 text-gray-600'>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>

            <div className='flex justify-between xs:text-sm text-[10px]'>

                <div className='flex gap-3 items-center'>
                    <img src={news.provider[0]?.image?.thumbnail?.contentUrl} alt="Not Avai." className='h-[2rem] w-[2rem]'></img>
                    <p>{news.provider[0]?.name}</p>
                </div>

                <p>{moment(news.datePublished).startOf('ss').fromNow()}</p>
            </div>
        </div>
    </a>
  )
}

export default NewsCard