import { Button } from '@mui/material';
import React from 'react';
import { FaCross } from 'react-icons/fa';
import { IoMdCloseCircle } from 'react-icons/io';

const PreviewCategory = ({ handlePreviewClose }) => {
  // Hardcoded data
  const categoryName = "Category A";
  const description = "This is a description of Category A.";
  const imageUrl = "https://international-adviser.com/wp-content/uploads/2020/03/robo-AI-artifial-intelligence.jpg";
  const status = "active";
  const count = 42;

  return (
    <div className="w-full h-full flex items-center justify-center">

      <div className="w-[500px] h-[500px] bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className='flex justify-end'>
          <button onClick={handlePreviewClose}>
            <IoMdCloseCircle className='text-2xl text-pink-600' />
          </button>
        </div>
        {/* Category Name */}
        <h2 className="text-white text-2xl font-semibold mb-2">{categoryName}</h2>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4">{description}</p>

        {/* Image */}
        <div className="mb-4">
          <img src={imageUrl} alt={categoryName} className="w-full h-[300px] object-cover rounded-md" />
        </div>

        {/* Status and Count */}
        <div className="flex justify-between items-center">
          {/* Status */}
          <span className={`px-2 py-1 text-xs rounded-full ${status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {status}
          </span>

          {/* Count */}
          <span className="text-gray-300 text-sm">{count} Items</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCategory;
