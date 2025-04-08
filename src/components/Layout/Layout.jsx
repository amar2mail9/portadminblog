import React from 'react'
import LeftSide from '../LeftSidebar/LeftSide'
import Navbar from '../Navbar/Navbar'
import { useLocation } from 'react-router-dom'

const Layout = ({ children }) => {
  const location = useLocation()
  return (
    <div className='w-full h-screen flex flex-col'>

      <div className='flex flex-1'>
        {/* Left Sidebar */}
        <div className='w-[20%] bg-gray-800'>
          <LeftSide />
        </div>

        {/* Main Content Area */}
        <div className='w-[80%]'>
          <div className='bg-gray-800/70 h-10 w-full px-8 items-center flex '>
            {location.pathname}
          </div>
          <div className='p-6'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
