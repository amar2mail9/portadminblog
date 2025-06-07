import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CategoryCard = ({
  image,
  categoryName,
  slug,
  isPublished,
  description,
  handlePreviewOpen,
  handleEditOpen,
  handleDelete,
}) => {
  return (
    <div className="bg-white md:hidden mb-2 dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 max-w-sm mx-auto">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={image}
          alt={categoryName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {categoryName}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 line-clamp-3">
          {description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              isPublished
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isPublished ? "Public" : "Private"}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                handlePreviewOpen(slug);
              }}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              title="Preview"
            >
              <FaEye />
            </button>
            <button
              onClick={handleEditOpen}
              className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 text-sm flex items-center gap-1"
              title="Edit"
            >
              <FaEdit />
            </button>
            <button
              onClick={handleDelete}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 text-sm flex items-center gap-1"
              title="Delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
