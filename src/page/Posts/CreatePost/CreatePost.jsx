import React, { useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import default styling
import 'react-quill/dist/quill.bubble.css'; // Import bubble theme CSS

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState(''); // State to hold editor content

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleContentChange = (value) => {
        setContent(value); // Update content when text editor content changes
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle post creation logic here, now with content included
        console.log('Post Created:', { title, category, content });
    };

    // Toolbar options with all available modules
    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image', 'video'],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            ['clean']  // To clear the editor
        ],
    };

    return (
        <Layout>
            <div>
                <form onSubmit={handleSubmit}>
                    <section className='flex items-center justify-between gap-8'>
                        {/* Title */}
                        <div className='w-[70%]'>
                            <input
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                autoFocus={true}
                                className='text-gray-100 w-full bg-gray-800 py-2 px-3 rounded-lg border border-gray-600 shadow outline-0'
                                placeholder='Blog Title'
                            />
                        </div>
                        {/* Category */}
                        <div className='w-[30%]'>
                            <select
                                value={category}
                                onChange={handleCategoryChange}
                                className='bg-gray-800 w-full py-2 px-4 rounded-lg border border-gray-700'
                            >
                                <option value="">Select Category</option>
                                <option value="blockchain">Blockchain</option>
                                <option value="ai">Artificial Intelligence</option>
                                <option value="web3">Web 3.0</option>
                                <option value="all">All</option>
                            </select>
                        </div>
                    </section>

                    {/* Text Editor for Blog Content */}
                    <section className='mt-4 w-full h-96 '>
                        <ReactQuill
                            value={content}
                            onChange={handleContentChange}
                            theme="snow"  // 'snow' theme with custom styling
                            modules={modules}
                            className="bg-gray-800 h-80 mb-8  top-header !outline-0 border-none !text-white quill-editor"
                        />
                    </section>

                    <section className="flex items-center justify-between gap-8">
                        <textarea name="" rows={2} id="" className='border border-gray-800 w-[33%] p-2 rounded-lg outline outline-green-800' placeholder='expert'></textarea>
                        <textarea name="" rows={2} id="" className='border border-gray-800 w-[33%] p-2 rounded-lg outline outline-green-800' placeholder='meta data'></textarea>
                        <textarea name="" rows={2} id="" className='border border-gray-800 w-[33%] p-2 rounded-lg outline outline-green-800' placeholder='Tags'></textarea>
                    </section>
                    <br />

                    <button
                        type="submit"
                        className="py-2 px-6 bg-blue-500 text-white rounded-lg"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </Layout>
    );
};

export default CreatePost;
