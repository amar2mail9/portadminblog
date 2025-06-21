import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import Layout from "../Layout/Layout";
import Spinner from "../Spinner";
import { FaPlug, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";

const CategoryGrid = () => {
  const [categories, setCategories] = useState([]);
  const [isloading, setIsloading] = useState(false);

  // fecth category
  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/categories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    const data = await res.json();
    console.log(data);

    setCategories(data?.categories);
  };
  console.log(categories);

  // Delete Category

  const deleteCategory = async (_id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/category/${_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );

      if (res.ok) {
        // Update local state to remove the deleted category
        setCategories((prev) => prev.filter((cat) => cat._id !== _id));
      }
    } catch (error) {}
  };

  // use
  useEffect(() => {
    fetchData();
  }, []);

  if (categories?.length === 0) {
    return (
      <Layout>
        <Spinner message="Loading categories..." />
      </Layout>
    );
  }
  // return
  return (
    <Layout>
      {/* Category Add section */}
      <div className="flex items-end justify-end">
        <Link to={"/category/new"}>
          <button
            to="/category/new"
            className="bg-gradient-to-r from-indigo-600 to-purple-800 text-white px-6 py-2 rounded-lg flex  items-center justify-center gap-3 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-800 cursor-pointer transition-all ease-in-out duration-300 delay-300 hover:shadow-2xl hover:shadow-black"
          >
            <FaPlus /> Add
          </button>
        </Link>
      </div>
      {categories?.length === 0 ? (
        <div>
          <Spinner message="Loadning...." />
        </div>
      ) : (
        <div className="mt-5 grid xl:grid-cols-4 gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 ">
          {categories?.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                {...category}
                deleteCategory={deleteCategory}
              />
            );
          })}
        </div>
      )}
    </Layout>
  );
};

export default CategoryGrid;
