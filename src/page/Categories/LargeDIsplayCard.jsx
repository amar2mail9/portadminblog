import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const LargeDIsplayCard = ({
  image,
  categoryName,
  isPublished,
  description,
  slug,
  handlePreviewOpen,
  handleEditOpen,
  count,
  handleDelete,
}) => {
  return (
    <section className=" md:flex hidden items-center justify-between bg-gray-800/90 font-semibold text-[14px] px-4 py-2 rounded-lg mb-4">
      <div className="w-[15%]">
        <div className="w-[60px] h-[60px] rounded-full border  bg-gray-600">
          <img
            loading="lazy"
            src={image}
            alt=""
            className="w-full h-full  rounded-full object-cover object-center "
          />
        </div>
      </div>
      <div className="w-[25%]">
        <h2 className="text-start">{categoryName}</h2>
      </div>
      <div className="w-[25%]">
        <h2 className="text-start line-clamp-2">{description}</h2>
      </div>
      <div className="w-[5%]">
        <h2 className="text-start">{count || 0}</h2>
      </div>
      <div className="w-[5%]">
        <h2 className="text-start">{isPublished ? "Public" : "Private"}</h2>
      </div>
      <div className="w-[15%]">
        <div className="flex items-center justify-evenly px-4">
          {/* View Button */}
          <button
            onClick={() => {
              handlePreviewOpen();
            }}
            className="w-8 h-8 p-1.5 rounded-full text-green-600  cursor-pointer bg-transparent hover:text-white hover:bg-green-700 transition-colors duration-300"
          >
            <FaEye className="w-full  h-full " />
          </button>

          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="w-8 h-8 p-2 rounded-full bg-transparent text-rose-600 cursor-pointer  hover:text-white hover:bg-rose-700 transition-colors duration-300"
          >
            <FaTrash className="w-full  h-full" />
          </button>

          {/* Edit Button */}
          <button
            onClick={handleEditOpen}
            className="w-8 h-8 p-1.5 rounded-full text-yellow-600 hover:text-white cursor-pointer  bg-transparent hover:bg-yellow-600 transition-colors duration-300"
          >
            <FaEdit className="w-full  h-full " />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LargeDIsplayCard;
