import React from 'react'
import { useLocation,Link } from 'react-router-dom'
import { HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';

function Sidebar({sidebar, setSidebar}) {

    const location = useLocation();

    function clickHandler() {
        setSidebar(!sidebar);
    }

    return (
        <div className='text-white mt-3'>
            <div className={`flex items-center gap-3 py-3 px-5 ${location.pathname === '/' ? 'bg-blue-500 dark:bg-white dark:bg-opacity-20' : 'bg-blue-950 dark:bg-neutral-900'}`}>
                <HomeOutlined/>
                <Link to={"/"} onClick={clickHandler}>Home</Link>
            </div>
            <div className={`flex items-center gap-3 py-3 px-5 ${location.pathname === '/cryptocurrencies' ? 'bg-blue-500 dark:bg-white dark:bg-opacity-20' : 'bg-blue-950 dark:bg-neutral-900'} `}>
                <FundOutlined/>
                <Link to={"/cryptocurrencies"}>Cryptocurrencies</Link>
            </div>
            <div className={`flex items-center gap-3 py-3 px-5 ${location.pathname === '/news' ? 'bg-blue-500 dark:bg-white dark:bg-opacity-20' : 'bg-blue-950 dark:bg-neutral-900'}`}>
                <BulbOutlined/>
                <Link to={"/news"}>News</Link>
            </div>
        </div>
    )
}

export default Sidebar