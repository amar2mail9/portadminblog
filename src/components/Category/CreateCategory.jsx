import React from "react";
import Layout from "../Layout/Layout";
import { useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import Spinner from "../Spinner";

export const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isPublished, setIsPublished] = useState(true);
  const [isloading, setIsloading] = useState(false);

  //handel image upload
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
      const reader = new FileReader();

      reader.onload = () => {};
      reader.readAsDataURL(file);
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
        toast.success(`${data.message || data.error || "Create Sucessfully"}`);
        setCategoryName("");
        setDescription("");
        setImage(null);
        setIsPublished(false);
        setIsloading(false);
      }
      if (!res.ok) {
        toast.error(`${data.message || data.error || "Failded"}`);
      }
      setIsloading(false);
    } catch (error) {
      return toast.error(`ERR: ${error?.error || error.message}`);
    }
  };

  
  if (isloading) {
    return (
      <Layout>
        <div className="">
          <Spinner message="Adding Category...." />
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="max-w-xl mx-auto p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-md text-gray-100">
        <h2 className="text-xl font-semibold mb-4">Create New Category</h2>

        {/* Category Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Category Name
          </label>
          <input
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
            value={categoryName}
            type="text"
            id="name"
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-Pink-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1"
          >
            Description
          </label>
          <textarea
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            id="description"
            rows="4"
            placeholder="Enter description"
            className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-Pink-500"
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium mb-1">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            onChange={() => {
              handleImageUpload(event);
            }}
            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-Pink-950 file:text-Pink-400
              hover:file:bg-Pink-800"
          />
        </div>

        {/* Is Published */}
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="published"
            className="w-4 h-4 text-pink-600 bg-gray-700 border-gray-600 rounded focus:ring-Pink-500"
          />
          <label htmlFor="published" className="ml-2 text-sm">
            Publish this category
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
