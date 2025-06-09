import { Global } from "@emotion/react";
import React from "react";
import { FaEye, FaGlobe, FaLock, FaRegEdit, FaTrashAlt } from "react-icons/fa";

const CategoryCard = ({
  title = "Amar Kuamr",
  image = "Helloo",
  description = "Hello",
  isPublished,
  featuredImage,
  categoryName,
}) => {
  return (
    <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300">
      <img
        src={featuredImage}
        alt={categoryName}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{categoryName}</h3>
        <p className="text-gray-300 text-sm">{description}</p>

        {/* action button */}
        <div className="flex items-center justify-between">
          {/* Status */}
          <span>
            {isPublished ? (
              <button className="w-6 h-6 p-1 text-green-500 hover:text-white hover:rounded-full transition-all ease-in-out duration-200 hover:bg-green-600 shadow-green-600 hover:shadow cursor-pointer">
                <FaGlobe className="w-full h-full" />
              </button>
            ) : (
              <button className="w-6 h-6 p-1 text-red-500 hover:text-white hover:rounded-full transition-all ease-in-out duration-200 hover:bg-red-600 shadow-red-600 hover:shadow cursor-pointer">
                {" "}
                <FaLock className="w-full h-full" />
              </button>
            )}
          </span>
          {/* Button */}
          <div>
            <button className="w-6 h-6 p-1 text-gray-500 hover:text-white hover:rounded-full transition-all ease-in-out duration-200 hover:bg-gray-600 shadow-gray-600 hover:shadow cursor-pointer">
              <FaEye className="w-full h-full" />
            </button>
            <button className="w-6 h-6 p-1 text-yellow-500 hover:text-white hover:rounded-full transition-all ease-in-out duration-200 hover:bg-yellow-600 shadow-yellow-600 hover:shadow cursor-pointer">
              <FaRegEdit className="w-full h-full" />
            </button>
            <button className="w-6 h-6 p-1 text-rose-500 hover:text-white hover:rounded-full transition-all ease-in-out duration-200 hover:bg-rose-600 shadow-rose-600 hover:shadow cursor-pointer">
              <FaTrashAlt className="w-full h-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
