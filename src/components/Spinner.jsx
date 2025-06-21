import React from "react";

const Spinner = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      {/* Spinner Rings */}
      <div className="relative w-24 h-24">
        {/* Outer Ring - subtle shadow + soft spin */}
        <div className="absolute inset-0 rounded-full border-4 border-indigo-300 animate-spin-slow shadow-inner shadow-indigo-200"></div>

        {/* Mid Ring - distinct border and faster rotation */}
        <div className="absolute inset-2 rounded-full border-t-4 border-b-4 border-purple-500 animate-spin shadow-md"></div>

        {/* Inner Ring - contrast ring */}
        <div className="absolute inset-4 rounded-full border-l-4 border-r-4 border-indigo-600 animate-spin-fast shadow-sm"></div>

        {/* Pulsing Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 bg-purple-600 rounded-full animate-ping shadow-lg shadow-purple-400"></div>
        </div>
      </div>

      {/* Loading Text */}
      <p className="text-indigo-700 font-semibold text-base tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Spinner;
