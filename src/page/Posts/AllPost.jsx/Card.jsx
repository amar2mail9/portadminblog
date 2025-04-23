import React from "react";
import { MdVisibility } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { dateFormateShort } from "../../../FormateCahnger";
import { FaGlobe, FaLock } from "react-icons/fa";

export default function BlogCard({
  title,
  description,
  image,
  category,
  date,
  status,
  onView,
  onEdit,
  onDelete,
  isPublished,
}) {
  return (
    <div className="w-full max-w-sm mx-auto h-[340px] rounded-lg shadow-xl border border-gray-700 bg-gray-800 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative h-40">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 bg-[#1238] bg-opacity-60 w-full px-3 py-2">
          <div className="flex justify-between text-xs text-gray-200">
            <span>{category}</span>
            <span>{dateFormateShort(date)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h5 className="text-md font-semibold text-white line-clamp-2 mb-1">
            {title}
          </h5>
          <p className="text-sm text-gray-400 line-clamp-3">{description}</p>
        </div>

        {/* Actions */}
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={onView}
            className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
          >
            <MdVisibility /> View
          </button>
          <div className="flex gap-2">
            <span className="  text-xs flex items-center rounded-full text-center">
              {isPublished ? (
                <FaGlobe className="tex-lg text-green-500" />
              ) : (
                <FaLock className="tex-lg text-rose-500" />
              )}
            </span>
            <button
              onClick={onEdit}
              className="text-yellow-400 hover:text-yellow-300 text-sm"
            >
              <FiEdit />
            </button>
            <button
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
