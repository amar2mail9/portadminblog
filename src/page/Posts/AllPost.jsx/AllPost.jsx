import React from 'react';
import Layout from '../../../components/Layout/Layout';
import { blogData } from '../../../BlogData';
import { FaEdit, FaEye, FaGlobe, FaLock, FaTrash } from 'react-icons/fa';

const AllPost = () => {
  return (
    <Layout>
      <main>
        {/* Header with labels */}
        <section className="flex items-center justify-between bg-gray-800/90 font-semibold text-lg p-2 rounded-lg mb-4">
          <div className="w-[10%]">
            <h2 className="text-start">Image</h2>
          </div>
          <div className="w-[25%]">
            <h2 className="text-start">Title</h2>
          </div>
          <div className="w-[25%]">
            <h2 className="text-start">Content</h2>
          </div>
          <div className="w-[10%]">
            <h2 className="text-start">Category</h2>
          </div>
          <div className="w-[5%]">
            <h2 className="text-start">Status</h2>
          </div>
          <div className="w-[15%]">
            <h2 className="text-start">Action</h2>
          </div>
        </section>

        {/* Loop through blogData to create a row for each post */}
        <div className="w-full h-[79vh]">
          <div className="h-full w-full overflow-y-scroll scrollable-container">
            {blogData.map((blog, idx) => (
              <section
                key={idx}
                className="flex justify-between bg-gray-800/90 items-center text-sm p-2 rounded-lg mb-4"
              >
                {/* Image */}
                <div className="w-[10%] flex items-center justify-center h-full">
                  <div className="w-24 h-24">
                    <img
                      src={blog.featuredImage}
                      alt={blog.title}
                      className="w-full h-full object-center bg-cover rounded-full"
                    />
                  </div>
                </div>

                {/* Title */}
                <div className="w-[25%]">
                  <h2 className="text-start text-white">{blog.title}</h2>
                </div>

                {/* Content (first 100 characters of content) */}
                <div className="w-[25%]">
                  <p className="text-start text-white">
                    {blog.content.substring(0, 100)}...
                  </p>
                </div>

                {/* Category */}
                <div className="w-[10%]">
                  <p className="text-start text-white">{blog.category}</p>
                </div>

                {/* Status */}
                <div className="w-[5%] flex justify-center">
                  <p className="text-white/50 text-center capitalize ">
                    {blog.status}
                  </p>
                </div>

                {/* Action */}
                <div className="w-[15%]">
                  <div className="flex items-center space-x-2">
                    <button className="transform hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
                      <FaEye className="text-lg text-gray-500 hover:text-teal-400 transition-colors duration-200" />
                    </button>
                    <button className="transform hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
                      <FaTrash className="text-rose-500/40 text-lg hover:text-rose-600 transition-colors duration-200" />
                    </button>
                    <button className="transform hover:scale-110 transition-all duration-200 ease-in-out cursor-pointer">
                      <FaEdit className="text-orange-500/70 text-lg hover:text-orange-500 transition-colors duration-200" />
                    </button>
                  </div>
                </div>

              </section>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AllPost;
