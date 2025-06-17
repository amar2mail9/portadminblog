import { Box, CardMedia, Typography, useScrollTrigger } from "@mui/material";
import React, { useEffect, useState } from "react";
import Spinner from "../Spinner";

const PreViewData = ({ slug }) => {
  const [category, setCategory] = useState(null);
  const fetchCategoryData = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/category/${slug}`
      );

      if (res.ok) {
        const data = await res.json();

        setCategory(data.category);
      }
    } catch (error) {
      console.error(error.error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, [slug]);

  return (
    <div>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-sm max-w-xl bg-gray-900 border-2 border-gray-800 rounded-2xl shadow-2xl ">
        {category === null ? (
          <Spinner message="feacthing Details...." />
        ) : (
          <Box>
            <CardMedia
              className="rounded-t-lg object-cover object-center object-fit"
              sx={{ height: 250 }}
              image={category.featuredImage}
              title={category.categoryName}
            />
            <Box className="p-2 overflow-y-scroll  max-h-56 scrollable-container">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {category.categoryName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {category.description}
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PreViewData;
