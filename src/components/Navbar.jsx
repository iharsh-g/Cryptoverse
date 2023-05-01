import React, { useEffect, useState } from 'react'
import {Link, useLocation} from 'react-router-dom';
import icon from '../images/cryptocurrency_image.png';
import { HomeOutlined, BulbOutlined, FundOutlined } from '@ant-design/icons';
import {BsFillCloudSunFill, BsFillMoonStarsFill} from 'react-icons/bs';
import {AiOutlineBars} from 'react-icons/ai';

function Navbar({sidebar, setSidebar}) {
    const location = useLocation();    
    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        if(theme === "dark") {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark");
        }

    }, [theme]);

    function changeTheme() {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <div className='dark:bg-neutral-900 bg-blue-950 xl:h-screen xs:h-[70px] h-[50px] flex xl:flex-col flex-row-reverse justify-between'>

            <div className='flex flex-col items-stretch'>
                <div className='flex gap-5 items-center xl:p-[20px] py-2 px-5'>
                    <img src={icon} alt='' className='xs:w-[50px] xs:h-[50px] w-[25px] h-[25px]'/>
                    <Link to={"/"}>
                        <h1 className='text-blue-500 xs:text-3xl text-xl font-bold'>Cryptoverse</h1>
                    </Link>
                </div>   

                <div className='text-white mt-3 xl:block hidden'>
                    <div className={`flex items-center gap-3 py-3 px-5 ${location.pathname === '/' ? 'bg-blue-500 dark:bg-white dark:bg-opacity-20' : 'bg-blue-950 dark:bg-neutral-900'}`}>
                        <HomeOutlined/>
                        <Link to={"/"}>Home</Link>
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
            </div>
            

            <div className='flex xs:items-center gap-2 ml-3 xl:block xl:ml-0'>
                
                <div className='xl:hidden block text-white py-3 px-2' onClick={() => setSidebar(!sidebar)}>
                    <AiOutlineBars fontSize={'1.5rem'}/>
                </div>

                <div onClick={changeTheme} className='cursor-pointer bg-blue-950 dark:bg-neutral-900 xs:py-3 py-6 xs:px-5 flex items-center gap-3 mb-5 text-lg xl:mt-0 xs:mt-5'>
                    {theme === "dark" ? <BsFillCloudSunFill className='text-yellow-400'/> : <BsFillMoonStarsFill className='text-purple-400'/>}
                    {theme === "dark" ? <p className='text-white xs:block hidden'>Light Mode</p> : <p className='text-white xs:block hidden'>Dark Mode</p>}
                </div>
            </div>
        </div>
    )
}

export default Navbar