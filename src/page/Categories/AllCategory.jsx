import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import EditCategory from "./EditCategoery";
import PreviewCategory from "./PreviewCategory";
import CategoryCard from "./CategoryCard";
import LargeDIsplayCard from "./LargeDIsplayCard";

const AllCategory = () => {
  const [EditOpen, setEditOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [categories, setCategories] = useState([]);

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
    const res = await fetch(`${import.meta.env.VITE_API_URI}/categories`);
    const data = await res.json();
    setCategories(data.categories);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="md:block hidden">
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

        {categories.map((category, idx) => {
          console.log(category);

          return (
            <LargeDIsplayCard
              key={idx}
              categoryName={category.categoryName}
              status={category.status}
              image={
                category.featuredImage ||
                "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI="
              }
              count={19}
              handlePreviewOpen={handlePreviewOpen}
              handleEditOpen={handleEditOpen}
              description={category.description}
            />
          );
        })}
      </div>

      {/* small display */}
      {categories.map((category, idx) => {
        return (
          <CategoryCard
            key={idx}
            categoryName={category.categoryName}
            status={category.status}
            image={
              category.featuredImage ||
              "https://media.istockphoto.com/id/1403859199/photo/typical-huts-in-brana-mumian-somiedo-natural-park-asturias-spain.jpg?s=612x612&w=0&k=20&c=99N6RiIb4eQuyxqmTfiTAyxQrby6bo1xqLdJl4nvdXI="
            }
            count={19}
            handlePreviewOpen={handlePreviewOpen}
            handleEditOpen={handleEditOpen}
            description={category.description}
          />
        );
      })}

      {/* Edit category */}
      <Modal open={EditOpen} onClose={handleEditClose}>
        <EditCategory />
      </Modal>

      {/* Preview category */}
      <Modal open={previewOpen} onClose={handlePreviewClose}>
        <PreviewCategory handlePreviewClose={handlePreviewClose} />
      </Modal>
    </div>
  );
};

export default AllCategory;
