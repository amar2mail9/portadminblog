import React from "react";
import Cookies from "js-cookie";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuList } from "../../constant";
import { RiLogoutCircleLine } from "react-icons/ri";

const LeftSide = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    navigate("/login");
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-gray-50 to-pink-100">
      {" "}
      {/* Gradient Background for sidebar */}
      {/* logo section */}
      <div className="text-center">
        <h2 className={`text-2xl font-semibold capitalize p-5 `}>
          Admin Panel
        </h2>
      </div>
      <div className=" flex flex-col justify-between  w-full h-[80%]">
        {/* Menu items */}
        <div>
          {menuList.map((item, index) => {
            const isActive = item.path === location.pathname;
            return (
              <Link
                to={item.path}
                key={index}
                className={`flex mb-2 items-center gap-2 py-2 px-4  rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 hover:text-white 
                  ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-800 text-white shadow-lg"
                      : "bg-transparent"
                  }`}
              >
                {item.icon} {item.name}
              </Link>
            );
          })}
        </div>

        {/* LogOut Button */}
        <div className="">
          <button
            onClick={handleLogout}
            className="flex items-center w-full capitalize gap-2 py-2 px-4 text-white rounded-lg hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 bg-red-500 cursor-pointer hover:text-white"
          >
            <RiLogoutCircleLine /> LogOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
