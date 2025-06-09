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
  console.log(categories);

  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/categories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    fetchData();
  }, []);
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

      {categories.length === 0 || null ? (
        <Spinner />
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <CategoryCard key={index} {...category} />
          ))}
        </div>
      )}
      {/* Categor Data  */}
    </Layout>
  );
};

export default CategoryGrid;
