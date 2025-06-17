import { Box, CardMedia, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { data } from "react-router-dom";
import Spinner from "../../../components/Spinner";

const PreviewBlog = ({ slug }) => {
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/blog/${slug}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      const data = await res.json();
      setBlog(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    fetchBlog();
  }, [slug]);
  return (
    <div>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 md:h-[95vh] h-[75vh] -translate-y-1/2 min-w-sm max-w-full  bg-gray-900 border-1 border-gray-600 rounded-lg shadow-2xl">
        {blog === null ? (
          <Spinner />
        ) : (
          <Box>
            <Box className="h-[35%] rounded-2xl">
              <CardMedia
                component="img"
                className="h-full object-center object-cover rounded-t-lg"
                image={`${blog?.thumbnail}`}
                alt={`${blog?.title}`}
              />
            </Box>
            <Typography
              id="modal-modal-title"
              variant="h6"
              className="px-4"
              component="h2"
            >
              {blog?.title || "Untitled"}
            </Typography>

            <Box
              className="h-[58%] scrollable-container px-4 overflow-y-scroll"
              id="modal-modal-description"
              component="div"
              sx={{ mt: 2 }}
              dangerouslySetInnerHTML={{ __html: blog?.content }}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default PreviewBlog;
