import React from "react";

const Spinner = ({ message = "Loading Data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-spin-slow blur-sm opacity-40"></div>

        {/* Mid ring */}
        <div className="absolute inset-2 rounded-full border-t-2 border-b-2 border-indigo-500 animate-spin"></div>

        {/* Inner ring */}
        <div className="absolute inset-4 rounded-full border-l-2 border-r-2 border-purple-500 animate-spin-fast"></div>

        {/* Pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-cyan-400 rounded-full animate-ping shadow-lg shadow-cyan-400"></div>
        </div>
      </div>

      <p className="text-cyan-300 font-mono text-sm animate-pulse">{message}</p>
    </div>
  );
};

export default Spinner;
