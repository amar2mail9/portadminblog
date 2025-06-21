import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash, FaUserAlt } from "react-icons/fa";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_URI = import.meta.env.VITE_API_URI;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URI}/users/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success(`Welcome, ${data.user.username}!`);
        Cookies.set("accessToken", data.user?.accessToken, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        navigate("/");
      } else {
        toast.error(`${data.error || data.message}`);
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-linear-to-bl from-indigo-100 to-purple-100 p-4">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-b from-indigo-400 to-blue-400 p-8">
          <div className="flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl font-bold">Welcome Back!</h1>
            <p className="text-lg mt-4 max-w-md">
              Log in to continue your journey with us. Enter your credentials to
              access your account.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-gray-50">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 flex items-center justify-center">
              <FaUserAlt className="w-full h-full p-4 text-white" />
            </div>
            <p className="font-semibold text-2xl text-gray-800 mt-4">Sign In</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-800 font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-800 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-red-600 text-sm bg-red-100 p-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
