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
            className="py-2 px-6 rounded-lg flex items-center gap-3 cursor-pointer hover:bg-gray-600 transition-all delay-200 ease-in-out bg-gray-700"
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
        <div className="mt-5">
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
