import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Spinner from "../Spinner";
import { useNavigate } from "react-router-dom";

export const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [isloading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.warn("File Size less Than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.warn("Only image Allowed");
        return;
      }
      setImage(file);
    }
  };

  const submitData = async () => {
    setIsloading(true);
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("description", description);
    formData.append("isPublished", isPublished);
    formData.append("image", image);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/category/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(`${data.message || "Created Successfully"}`);
        setCategoryName("");
        setDescription("");
        setImage(null);
        setIsPublished(false);
        setIsloading(false);
        navigate("/categories");
      } else {
        toast.error(`${data.message || "Failed"}`);
        setIsloading(false);
      }
    } catch (error) {
      toast.error(`ERR: ${error?.message || "Unknown error"}`);
      setIsloading(false);
    }
  };

  if (isloading) {
    return (
      <Layout>
        <div className="">
          <Spinner message="Adding Category..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Create New Category
        </h2>

        {/* Category Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category Name
          </label>
          <input
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            type="text"
            id="name"
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="description"
            rows="4"
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-pink-600 file:text-white
              hover:file:bg-pink-700"
          />
        </div>

        {/* Is Published */}
        <div className="mb-6 flex items-center">
          <input
            onChange={() => setIsPublished((prev) => !prev)}
            checked={isPublished}
            type="checkbox"
            id="published"
            className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
          />
          <label htmlFor="published" className="ml-2 text-sm text-gray-800">
            {isPublished ? "Public" : "Private"}
          </label>
        </div>

        {/* Save Button */}
        <div>
          <button
            onClick={submitData}
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 cursor-pointer text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Save Category
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
