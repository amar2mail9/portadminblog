import React from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdPerson } from "react-icons/md";

const Signup = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  return (
    <div className="flex items-center justify-center w-full h-screen bg-slate-800">
      <div className="bg-gray-800/80 backdrop-blur-lg w-full  scale-95 max-w-3xl sm:max-w-4xl shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-b from-teal-500 to-blue-500 p-6 sm:p-8">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Join Us!
            </h1>
            <p className="text-gray-100 text-base sm:text-lg mt-4 max-w-sm">
              Create an account to start your journey with us. Fill in your
              details to get started.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-4 sm:p-4 flex flex-col justify-center">
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center">
              <MdPerson className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="font-semibold text-xl sm:text-2xl text-gray-200 mt-3 sm:mt-4">
              Sign Up
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5 sm:gap-6">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 font-medium text-sm sm:text-base">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Amar Kumar"
                  className="border outline-0 focus:border-blue-500 border-gray-600/50 bg-gray-700/50 text-gray-200 p-2.5 sm:p-3 rounded-lg placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 font-medium text-sm sm:text-base">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="amar2mail9"
                  className="border border-gray-600/50 outline-0 focus:border-blue-500 bg-gray-700/50 text-gray-200 p-2.5 sm:p-3 rounded-lg placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 font-medium text-sm sm:text-base">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="amar2mail9@gmail.com"
                  className="border border-gray-600/50 outline-0 focus:border-blue-500 bg-gray-700/50 text-gray-200 p-2.5 sm:p-3 rounded-lg placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-300 font-medium text-sm sm:text-base">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="9608551367"
                  className="border border-gray-600/50 outline-0 focus:border-blue-500 bg-gray-700/50 text-gray-200 p-2.5 sm:p-3 rounded-lg placeholder-gray-400 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium text-sm sm:text-base">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="*********"
                  className="w-full border outline-0 focus:border-blue-500 border-gray-600/50 bg-gray-700/50 text-gray-200 p-2.5 sm:p-3 rounded-lg placeholder-gray-400 text-sm sm:text-base"
                />
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <FiEye className="w-5 h-5" />
                  ) : (
                    <FiEyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium text-sm sm:text-base">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  placeholder="*********"
                  className="w-full border outline-0 focus:border-blue-500 border-gray-600/50 bg-gray-700/50 text-gray-200 p-2.5 sm:p-3 rounded-lg placeholder-gray-400 text-sm sm:text-base"
                />
                <button
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <FiEye className="w-5 h-5" />
                  ) : (
                    <FiEyeOff className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-semibold py-2.5 sm:py-3 rounded-lg hover:from-teal-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up
            </button>

            <p className="text-center text-xs sm:text-sm text-gray-400 mt-3 sm:mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-teal-400 hover:text-teal-300 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
