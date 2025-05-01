import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const CreateCategory = () => {
  const [imageFile, setImageFile] = useState(null); // for FormData
  const [imagePreview, setImagePreview] = useState(null); // for UI
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const createCategory = async () => {
    if (!categoryName || !description || !imageFile) {
      return toast.warn("All fields including image are required.");
    }

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("description", description);
    formData.append("isPublished", isPublished);
    formData.append("image", imageFile); // 👈 Send real image file

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/category/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Request failed");

      toast.success("Category created successfully!");
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <Box className="bg-gray-800 absolute border border-gray-600 rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-xl md:w-[500px] w-11/12">
      <Typography variant="h6" className="text-white mb-4">
        Create a New Category
      </Typography>

      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full border p-2 rounded-lg border-gray-600 bg-gray-700 text-lg mt-3 outline-none"
        placeholder="Category Name"
      />

      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded-lg border-gray-600 bg-gray-700 text-lg mt-3 outline-none"
        placeholder="Description"
      />

      <div className="flex justify-between">
        {!imagePreview ? (
          <Button
            component="label"
            variant="contained"
            startIcon={<FaUpload />}
            sx={{ marginTop: "16px" }}
          >
            Upload Image
            <input
              type="file"
              hidden
              onChange={handleImageUpload}
              accept="image/jpeg, image/png, image/jpg"
            />
          </Button>
        ) : (
          <div className="w-full flex justify-center">
            <Box
              sx={{ marginTop: "16px", textAlign: "center" }}
              className="w-[300px] h-[150px] rounded-lg"
            >
              <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </Box>
          </div>
        )}
      </div>

      <div className="mt-4">
        <button
          onClick={createCategory}
          className="flex items-center gap-2 py-2 px-8 rounded-lg text-[1rem] bg-gradient-to-r from-pink-600 to-pink-800 text-white"
        >
          Save
        </button>
      </div>
    </Box>
  );
};

export default CreateCategory;
