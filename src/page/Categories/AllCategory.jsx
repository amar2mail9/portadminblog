import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa'
import EditCategory from './EditCategoery'
import PreviewCategory from './PreviewCategory'

const AllCategory = () => {

    const [EditOpen, setEditOpen] = useState(false)
    const [previewOpen, setPreviewOpen] = useState(false)


    const handleEditOpen = () => {
        setEditOpen(true)
    }
    const handleEditClose = () => {
        setEditOpen(false)
    }

    const handlePreviewOpen = () => {
        setPreviewOpen(true)
    }

    const handlePreviewClose = () => {
        setPreviewOpen(false)
    }


    return (
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

            {/* display labels */}
            <section className="flex items-center justify-between bg-gray-800/90 font-semibold text-[14px] px-4 py-2 rounded-lg mb-4">
                <div className="w-[15%]">
                    <div className='w-[60px] h-[60px] rounded-full border  bg-gray-600'>
                        <img src="https://international-adviser.com/wp-content/uploads/2020/03/robo-AI-artifial-intelligence.jpg" alt="" className='w-full h-full  rounded-full object-cover object-center ' />
                    </div>
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
                    <div className='flex items-center justify-evenly px-4'>
                        {/* View Button */}
                        <button
                            onClick={handlePreviewOpen}
                            className='w-8 h-8 p-1.5 rounded-full text-green-600  cursor-pointer bg-transparent hover:text-white hover:bg-green-700 transition-colors duration-300'
                        >
                            <FaEye className='w-full  h-full ' />
                        </button>

                        {/* Delete Button */}
                        <button
                            className='w-8 h-8 p-2 rounded-full bg-transparent text-rose-600 cursor-pointer  hover:text-white hover:bg-rose-700 transition-colors duration-300'
                        >
                            <FaTrash className='w-full  h-full' />
                        </button>

                        {/* Edit Button */}
                        <button
                            onClick={handleEditOpen}
                            className='w-8 h-8 p-1.5 rounded-full text-yellow-600 hover:text-white cursor-pointer  bg-transparent hover:bg-yellow-600 transition-colors duration-300'
                        >
                            <FaEdit className='w-full  h-full ' />
                        </button>
                    </div>

                </div>
            </section>


            {/* Edit category */}
            <Modal open={EditOpen}
                onClose={handleEditClose}>
                <EditCategory />
            </Modal>


            {/* Preview category */}
            <Modal open={previewOpen}
                onClose={handlePreviewClose}>
                <PreviewCategory handlePreviewClose={handlePreviewClose} />
            </Modal>
        </div>
    )
}

export default AllCategory