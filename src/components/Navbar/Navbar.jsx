import React from 'react'


import { FaUserAlt } from 'react-icons/fa'
import Layout from '../Layout/Layout'

 const Navbar = () => {
<Layout>

        <header className='w-full h-[4rem] bg-gray-800 '>
            <nav className='flex w-full h-full items-center justify-between px-[4rem] '>
                {/* logo */}
                <div>
                    <h1 className='text-3xl font-bold uppercase  text-linear-to-r from-cyan-500 to-blue-500'>Blog Site</h1>
                </div>
                {/* User profile */}
                <div >
                  <button className='w-10 h-10 bg-gray-600 p-2 rounded-full'>
                    <FaUserAlt className='w-full h-full'/>
                  </button>
                </div>
            </nav>
        </header>
        </Layout>
 
  
}
export default Navbar