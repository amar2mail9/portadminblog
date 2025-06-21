import React, { useState } from "react";
import LeftSide from "../LeftSidebar/LeftSide";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { Box, Button, Modal } from "@mui/material";
import { menuList } from "../../constant";
import Cookies from "js-cookie";
import { FaSignOutAlt } from "react-icons/fa";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-[20%] md:block hidden bg-gray-50">
          <LeftSide />
        </div>

        {/* Main Content Area */}
        <div className="md:w-[80%] w-full flex flex-col">
          {/* Sticky Topbar */}
          <div className="bg-gray-50/90 h-12 w-full px-6 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md shadow-sm">
            <div className="flex items-center gap-1">
              <Link to="/" className="text-xl font-bold text-gray-800">
                {location.pathname === "/" ? "Dashboard" : "Home"}
              </Link>
              {location.pathname !== "/" && (
                <>
                  <span className="text-gray-900 text-xl">/</span>
                  <Link
                    to={location.pathname}
                    className="text-xl font-bold capitalize text-gray-900"
                  >
                    {location.pathname.replace("/", "").replace("-", " ")}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Sidebar Toggle */}
            <button
              onClick={handleOpen}
              className="!w-9 !h-9 p-2 !rounded-md !text-shadow-gray-800 !bg-gray-100 !flex items-center !justify-center md:hidden"
            >
              <TiThMenu className="!text-shadow-gray-800  text-2xl w-full h-full" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-auto flex-1">{children}</div>
        </div>

        {/* Mobile Modal Sidebar */}
        <Modal open={open} onClose={handleClose} className="md:hidden">
          <Box className="absolute top-0 left-0 w-64 h-full bg-gray-50 shadow-lg overflow-auto">
            <div className="p-6">
              {menuList.map((item, index) => {
                const isActive = item.path === location.pathname;
                return (
                  <Link
                    to={item.path}
                    key={index}
                    onClick={handleClose}
                    className={`flex mb-2 items-center gap-2 py-2 px-4 text-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 
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
              <Button
                onClick={() => {
                  Cookies.remove("accessToken");
                  navigate("/login");
                }}
                className="!text-white !w-full  !flex !items-center !text-center !justify-center !gap-2 !capitalize !transition-all !duration-200 !bg-rose-600 hover:!bg-rose-700"
              >
                <FaSignOutAlt /> SignOut
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Layout;
