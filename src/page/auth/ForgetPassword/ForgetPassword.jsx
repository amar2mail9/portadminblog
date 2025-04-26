import { Modal } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [otpSent, setOtpSent] = useState(false);

  const handleSubmit = () => {
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      {otpSent ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
            Forgot Password
          </h2>
          <p className="text-center text-gray-100 mb-6">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-50 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            {message && (
              <p className="text-green-300 text-sm mb-2">{message}</p>
            )} */}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send OTP
            </button>
          </form>

          <p className="text-center text-gray-50 mt-6">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      ) : (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md  mx-auto mt-40 outline-none">
          <h3 className="text-xl font-bold text-gray-50 mb-4 text-center">
            Verify OTP
          </h3>
          <p className="text-gray-300 text-center mb-4">
            Enter the OTP sent to <span className="font-medium"></span>
          </p>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link to={"/change-password"}>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Verify
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
