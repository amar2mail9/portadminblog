import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { MdPerson } from "react-icons/md";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setILoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    fullname: "",
    role: "admin",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isPasswordStrong = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setILoading(true);

      if (
        formData.password === formData.email ||
        formData.password === formData.phone ||
        formData.password === formData.username ||
        formData.password === formData.fullname
      ) {
        toast.warn("Password should not match any personal detail!");
        setILoading(false);
        return;
      }

      if (!isPasswordStrong(formData.password)) {
        toast.warn(
          "Weak Password! Use 8+ chars, uppercase, lowercase, number & symbol."
        );
        setILoading(false);
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/users/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      setILoading(false);

      if (res.ok) {
        toast.success(`${data.message || "Registered successfully!"}`);
        navigation("/login");
      } else {
        toast.error(`${data.message || data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error(error.message || "Signup failed");
      setILoading(false);
    }
  };

  useEffect(() => {
    const filled =
      formData.email.trim() &&
      formData.fullname.trim() &&
      formData.password.trim() &&
      formData.username.trim() &&
      formData.phone.trim();
    setDisabled(!filled);
  }, [formData]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="bg-white w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="hidden md:flex w-full md:w-1/2 bg-gradient-to-b from-indigo-400 to-blue-400 p-8">
          <div className="flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-4xl font-bold">Join Us!</h1>
            <p className="text-lg mt-4 max-w-md">
              Create an account to begin your journey. Just fill in your
              details.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center bg-gray-50">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400 flex items-center justify-center">
              <MdPerson className="w-8 h-8 text-white" />
            </div>
            <p className="font-semibold text-2xl text-gray-800 mt-4">Sign Up</p>
          </div>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleOnChange}
                  placeholder="Full Name"
                  className="border border-gray-300 bg-white text-gray-800 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              {/* Username */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-medium">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleOnChange}
                  placeholder="Username"
                  className="border border-gray-300 bg-white text-gray-800 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-medium">
                  Email ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="you@example.com"
                  className="border border-gray-300 bg-white text-gray-800 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-gray-800 font-medium">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleOnChange}
                  placeholder="1234567890"
                  className="border border-gray-300 bg-white text-gray-800 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="text-gray-800 font-medium">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="********"
                  className="w-full border border-gray-300 bg-white text-gray-800 p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  required
                />
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <FiEyeOff className="w-5 h-5" />
                  ) : (
                    <FiEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={disabled || isLoading}
              type="submit"
              className={`w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 ${
                disabled || isLoading ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
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
