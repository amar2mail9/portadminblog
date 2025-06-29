import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import PostCard from "./PostCard";
import { Button } from "@mui/material";
import Spinner from "../../../components/Spinner.jsx";
const Posts = () => {
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/blogs/all`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setBlogs(data.data);
      } else
        toast.error(`${data.message || data.err || data.error || "Error "}`);
    } catch (error) {
      toast.error(`${error.error || "Something Went Wrong"}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [location.pathname === "/blog-post"]);
  return (
    <Layout>
      <section className="flex justify-end items-end my-4">
        <Link to={"/create-post"}>
          <Button className=" !text-white !capitalize !bg-gradient-to-r !from-indigo-600 !to-purple-800">
            Create Blog
          </Button>
        </Link>
      </section>
      {blogs.length === 0 ? (
        <Spinner message="Loading Blogs..." />
      ) : (
        <section className="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ">
          {blogs.map((blog, idx) => {
            return <PostCard key={idx} {...blog} />;
          })}
        </section>
      )}
    </Layout>
  );
};

export default Posts;
