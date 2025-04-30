import {
  Box,
  Button,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

const CreateCategory = () => {
  const [image, setImage] = useState(null); // For storing the uploaded image preview

  // Handle image preview
  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the file as base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box className="bg-gray-800 absolute border border-gray-600 rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 shadow-xl md:w-[500px] w-11/12 ">
      <Typography variant="h6" component="h2" className="text-white mb-4">
        Create a New Category
      </Typography>
      {/* Category Name */}
      <input
        type="text"
        className=" w-full border p-2 rounded-lg border-gray-600 bg-gray-700 text-lg mt-3 outline-none"
        placeholder="Category Name"
      />
      {/* Description */}
      <br />
      <textarea
        type="text"
        rows={3}
        className=" w-full border p-2 rounded-lg border-gray-600 bg-gray-700 text-lg mt-3 outline-none"
        placeholder="Description"
      />

      <div className="flex justify-between">
        {/* File Upload */}
        {!image ? (
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
              className="w-[300px] h-[150px] rounded-lg "
            >
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-full h-full object-cover object-center rounded-lg"
              />
            </Box>
          </div>
        )}
      </div>
      <br />
      <div>
        <button className="flex items-center gap-2 py-2 px-8 rounded-lg text-[1rem] bg-gradient-to-r from-pink-600 to-pink-800 text-white">
          {" "}
          Save
        </button>
      </div>
    </Box>
  );
};

export default CreateCategory;
