import React from 'react'
import { BiSolidCategory } from 'react-icons/bi'
import { FaBlog, FaCog, FaDashcube, FaUserAlt, FaUsers, FaChartLine, FaCloudUploadAlt, FaComments } from 'react-icons/fa'
import { IoMdAddCircle } from 'react-icons/io'
import { MdCategory } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'

const LeftSide = () => {

  const menuList = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaDashcube />
    },
    {
      name: "Posts",
      path: '/blog-post',
      icon: <FaBlog />
    }, {
      name: "Create Blog",
      path: "/create-post",
      icon: <IoMdAddCircle />
    },
    {
      name: "Categories",
      path: '/categories',
      icon: <BiSolidCategory />
    },
    {
      name: "Comments",
      path: '/comments',
      icon: <FaComments />
    },
    {
      name: "User Management",
      path: '/user-management',
      icon: <FaUsers />
    },
    {
      name: "Analytics",
      path: '/analytics',
      icon: <FaChartLine />
    },
    {
      name: "Settings",
      path: '/settings',
      icon: <FaCog />
    }
  ]

  const location = useLocation()

  const handleLogout = () => {
    // Logic for logging out the user (e.g., clearing authentication data)
    localStorage.removeItem('authToken')  // Example: remove auth token from localStorage
    window.location.href = '/login' // Redirect to login page after logout
  }

  return (
    <div className='w-full h-full bg-gradient-to-b from-gray-800 to-gray-900'> {/* Gradient Background for sidebar */}

      {/* logo section */}
      <div className='text-center'>
        <h2 className={`text-2xl font-semibold capitalize p-5 text-gray-200`}>
          Admin Panel
        </h2>
      </div>

      <div className=' flex flex-col justify-between  w-full h-[80%]'>
        {/* Menu items */}
        <div>
          {
            menuList.map((item, index) => {
              const isActive = item.path === location.pathname
              return (
                <Link
                  to={item.path}
                  key={index}
                  className={`flex mb-2 items-center gap-2 py-2 px-4 text-white rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white 
                  ${isActive ? "bg-gradient-to-r from-pink-600 to-pink-800 text-white shadow-lg" : "bg-transparent"}`}
                >
                  {item.icon} {item.name}
                </Link>
              )
            })
          }
        </div>

        {/* LogOut Button */}
        <div className="">
          <button
            onClick={handleLogout}
            className="flex items-center w-full capitalize gap-2 py-2 px-4 text-white rounded-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 bg-red-500 cursor-pointer hover:text-white"
          >
            <FaCloudUploadAlt /> LogOut
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
