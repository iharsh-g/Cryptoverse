import {Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';

import Homepage from './pages/Homepage';
import Cryptocurrencies from './pages/Cryptocurrencies';
import CryptoDetails from './pages/CryptoDetails';
import News from './pages/News';
import Footer from './components/Footer';
import { useState } from 'react';
import Sidebar from './components/Sidebar';

function App() {
    const [sidebar, setSidebar] = useState(false);

    return (
        <div className="flex overflow-hidden relative">
            <div className='w-[270px] fixed hidden xl:block'>
                <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
            </div>

            
            <div className={`${sidebar ? 'xs:w-[270px] w-[170px] z-[10]' : 'w-0 -z-[10]'} absolute xs:top-16 top-12 h-screen dark:bg-neutral-900 bg-blue-950 ease-in duration-300 transition-all`}>
                <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            </div>

            <div className={`${sidebar ? 'z-[5]' : '-z-[1]'} absolute xs:top-16 top-12 left-0 right-0 bottom-0 bg-black bg-opacity-20`} onClick={() => setSidebar(!sidebar)}></div>
            
            <div className='flex flex-col xl:ml-[270px] w-full'>
                <div className='block xl:hidden'>
                    <Navbar sidebar={sidebar} setSidebar={setSidebar}/>
                </div>

                <div className='routes'>
                    <Routes>
                        <Route path='/' element={<Homepage/>} />
                        <Route path='/cryptocurrencies' element={<Cryptocurrencies/>} />
                        <Route path='/crypto/:coinId' element={<CryptoDetails/>} />
                        <Route path='/news' element={<News/>} />
                    </Routes>
                </div>

                <div>
                    <Footer/>
                </div>
            </div>

            
        </div>
    );
}

export default App;
