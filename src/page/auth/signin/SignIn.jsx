import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { createCookieSessionStorage, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URI;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Login success:", data);
        toast.success(`${data?.user?.username}`);
        localStorage.setItem("access-Token", data.user.accessToken);
        navigate("/");
      } else {
        toast.error(`${data.error || data.message}`);
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 text-white w-full max-w-3xl shadow shadow-gray-700 flex flex-col md:flex-row rounded-lg overflow-hidden">
        {/* Left Side */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-t from-pink-500 to-gray-500">
          <div className="flex items-center flex-col justify-center h-full p-6 text-center">
            <h1 className="text-3xl font-bold text-gray-200">Welcome Back!</h1>
            <p className="text-gray-100 text-base mt-2">
              Please enter your credentials to continue.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 h-full p-6 flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center justify-center flex-col mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center">
              <FaUser className="w-8 h-8 text-gray-200" />
            </div>
            <p className="font-semibold text-gray-300 text-lg mt-3">Sign In</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-400 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-600 rounded py-2 px-3 bg-transparent outline-none text-white placeholder-gray-400"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm text-gray-400 mb-1"
              >
                Password
              </label>
              <div className="flex items-center border border-gray-600 rounded px-3 bg-transparent">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-grow bg-transparent outline-none py-2 text-white placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="text-gray-400 ml-2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm mb-4">
              <a href="#" className="text-pink-400 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Error */}
            {error && <div className="text-red-400 text-sm mb-4">{error}</div>}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-pink-500 hover:bg-pink-600 transition-colors py-2 rounded font-semibold"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-400 mt-4">
              Don’t have an account?{" "}
              <a href="#" className="text-pink-400 hover:underline">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
