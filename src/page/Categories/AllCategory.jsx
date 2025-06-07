import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import EditCategory from "./EditCategoery";
import PreviewCategory from "./PreviewCategory";
import CategoryCard from "./CategoryCard";
import LargeDIsplayCard from "./LargeDIsplayCard";
import Cookies from "js-cookie";

const AllCategory = () => {
  const [EditOpen, setEditOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [categories, setCategories] = useState(null);
  const [slug, setSlug] = useState("");
  const handleEditOpen = () => {
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handlePreviewOpen = () => {
    setPreviewOpen(true);
  };

  const handlePreviewClose = () => {
    setPreviewOpen(false);
  };

  const fetchData = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URI}/categories/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
    const data = await res.json();
    setCategories(data?.categories);
  };

  const handleDelete = async () => {
    const fetchData = await fetch(
      `${import.meta.env.VITE_API_URI}/category/${slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );

    console.log(await fetchData.json());
    alert();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="md:block hidden">
        {categories?.length === 0 || null ? (
          <div className="flex ">
            <p>Loading....</p>
          </div>
        ) : (
          <div>
            {/* Header with labels */}
            <section className="flex items-center justify-between bg-gray-800/90 font-semibold text-[14px] px-4 py-2 rounded-lg mb-4">
              <div className="w-[15%]">
                <h2 className="text-start">Image</h2>
              </div>
              <div className="w-[25%]">
                <h2 className="text-start">Category Name</h2>
              </div>
              <div className="w-[25%]">
                <h2 className="text-start">Description</h2>
              </div>
              <div className="w-[5%]">
                <h2 className="text-start">Count</h2>
              </div>
              <div className="w-[5%]">
                <h2 className="text-start">Status</h2>
              </div>
              <div className="w-[15%]">
                <h2 className="text-start">Action</h2>
              </div>
            </section>

            {/* large display labels */}

            {categories?.map((category, idx) => {
              return (
                <LargeDIsplayCard
                  slug={category.slug}
                  key={idx}
                  categoryName={category?.categoryName}
                  isPublished={category?.isPublished}
                  image={category?.featuredImage}
                  count={category.count || 0}
                  handlePreviewOpen={() => {
                    handlePreviewOpen();
                    setSlug(category.slug);
                  }}
                  handleDelete={() => {
                    handleDelete();
                    setSlug(category?._id);
                  }}
                  handleEditOpen={handleEditOpen}
                  description={category?.description}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* small display */}
      <div className="md:hiden block">
        {categories?.map((category, idx) => {
          return (
            <CategoryCard
              slug={category.slug}
              key={idx}
              categoryName={category?.categoryName}
              isPublished={category?.isPublished}
              image={category?.featuredImage}
              count={category.count || 0}
              handlePreviewOpen={() => {
                handlePreviewOpen();
                setSlug(category.slug);
              }}
              handleDelete={() => {
                handleDelete();
                setSlug(category?._id);
              }}
              handleEditOpen={handleEditOpen}
              description={category.description}
            />
          );
        })}
      </div>

      {/* Edit category */}
      <Modal open={EditOpen} onClose={handleEditClose}>
        <EditCategory slug={slug} />
      </Modal>

      {/* Preview category */}
      <Modal open={previewOpen} onClose={handlePreviewClose}>
        <PreviewCategory handlePreviewClose={handlePreviewClose} slug={slug} />
      </Modal>
    </div>
  );
};

export default AllCategory;
