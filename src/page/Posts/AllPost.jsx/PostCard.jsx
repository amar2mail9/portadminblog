import React from "react";
import { MdVisibility } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { dateFormateShort } from "../../../FormateCahnger";
import { FaGlobe, FaLock } from "react-icons/fa";
import { Box, Modal, Typography } from "@mui/material";
import PreviewBlog from "./PreviewBlog";

export default function PostCard({
  title,
  expert,
  thumbnail,
  category,
  slug,
  createdAt,
  isPublished,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // return data
  return (
    <>
      <div className="w-full max-w-sm mx-auto h-[340px] rounded-lg shadow-xl border border-gray-200 bg-gray-100 flex flex-col overflow-hidden">
        {/* Image */}
        <div className="relative h-40">
          <img
            src={
              thumbnail ?? "https://via.placeholder.com/400x160?text=No+Image"
            }
            alt={title ?? "Image"}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-[#1238] bg-opacity-60 w-full px-3 py-2">
            <div className="flex justify-between text-xs text-gray-200">
              <span>{category.categoryName ?? "Uncategorized"}</span>
              <span>
                {createdAt ? dateFormateShort(createdAt) : "Unknown Date"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h5 className="text-md font-semibold text-gray-700 line-clamp-2 mb-1">
              {title ?? "Untitled"}
            </h5>
            <p className="text-sm text-gray-600 line-clamp-3">
              {expert ?? "No description"}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={handleOpen}
              className="flex items-center gap-1 text-blue-400 hover:underline text-sm"
            >
              <MdVisibility /> View
            </button>
            <div className="flex gap-2">
              <span className="text-xs flex items-center rounded-full text-center">
                {isPublished ? (
                  <FaGlobe className="text-lg text-green-500" />
                ) : (
                  <FaLock className="text-lg text-rose-500" />
                )}
              </span>
              <button
                // onClick={onEdit}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                <FiEdit />
              </button>
              <button
                // onClick={onDelete}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PreviewBlog slug={slug} />
      </Modal>
    </>
  );
}
