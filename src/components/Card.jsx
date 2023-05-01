import millify from 'millify'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {VscTriangleUp, VscTriangleDown} from 'react-icons/vsc'

function Card({currency}) {
  const navigate = useNavigate();

  function cardHandler() {
    navigate(`/crypto/${currency.uuid}`);
  }

  return (
    <div className='p-4 bg-white dark:bg-neutral-800 cursor-pointer rounded-xl w-[100%] hover:scale-110 transition-all duration-300 ease-in
      hover:shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] dark:text-white hover:dark:shadow-[rgba(255,255,255,_0.4)_0px_30px_90px]' onClick={cardHandler}>
        <div className='flex justify-between items-center mb-3'>
            <p className='font-semibold text-lg'>{`${currency.rank}. ${currency.name}`}</p>
            <div>
                <img src={currency.iconUrl} alt='Not Avai.' className='w-[40px] h-[40px]'/>
            </div>
        </div>

        <hr/>

        <p className='mt-5 my-2'>Price: {millify(currency.price)}</p>
        <p className='my-2'>Market Cap: {millify(currency.marketCap)}</p>
        <p className='my-2 flex'>
          Daily Change: {millify(currency.change)}
          <span className='-mt-1 ml-1'>{millify(currency.change) > 0 ? <VscTriangleUp className='text-lime-400'/> : <VscTriangleDown className='text-red-600'/>}</span>
        </p>
    </div>
  )
}

export default Card