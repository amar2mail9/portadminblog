import React from 'react';
import { Box } from '@mui/material';
import { IoClose } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

const PreviewPost = ({ handleClosedPostPreview, selectPost }) => {
    if (!selectPost) return null;

    return (
        <Box className="absolute rounded-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl w-[750px] h-[95%]">
            <section className="relative w-full h-full scrollable-container rounded-lg bg-gray-800 p-4 overflow-y-scroll text-white space-y-6">
                <button
                    onClick={handleClosedPostPreview}
                    className="absolute top-4 right-4 text-white text-2xl hover:text-pink-500 transition duration-200"
                    aria-label="Close preview"
                >
                    <IoClose />
                </button>

                <h1 className="text-3xl font-bold text-pink-400">{selectPost.title}</h1>

                <div className="w-full h-[350px]">
                    <img
                        src={selectPost.featuredImage}
                        alt={selectPost.title}
                        className="w-full h-full object-cover rounded-md"
                    />
                </div>

                <article className="text-gray-300 leading-7 text-lg whitespace-pre-line">
                    <p>{selectPost.content}</p>
                </article>

                <div className="mt-6 border-t border-gray-600 pt-4">
                    <h3 className="text-xl font-semibold mb-4">Comments</h3>
                    {selectPost.comments && selectPost.comments.length > 0 ? (
                        <ul className="space-y-4">
                            {selectPost.comments.map((comment, idx) => (
                                <li key={idx} className="bg-gray-700 p-3 rounded-md">
                                    <div className="flex items-center space-x-3 mb-1">
                                        <FaUserCircle className="text-2xl text-teal-400" />
                                        <div>
                                            <p className="font-semibold text-white">{comment.name}</p>
                                            <p className="text-sm text-teal-300">{comment.email}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 mt-1">{comment.comment}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400">No comments yet.</p>
                    )}
                </div>

            </section>
        </Box>
    );
};

export default PreviewPost;
