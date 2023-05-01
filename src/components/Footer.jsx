import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='bg-blue-950 dark:bg-neutral-900 py-4'>
        <div className='flex flex-col gap-3 text-white items-center justify-center'>
            <p className='font-bold'>Cryptoverse</p>
            <p className='font-semibold'>All Right Reserved</p>
            <div className='flex text-blue-500 font-semibold gap-3'>
                <Link to={"/"}>Home</Link>
                <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>
                <Link to={"/news"}>News</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer