import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Spinner from "../../../components/Spinner.jsx";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expert, setExpert] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => setContent(value);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("expert", expert);
      formData.append("category", selectedCategory);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const res = await fetch(`${import.meta.env.VITE_API_URI}/blog/new`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setTitle("");
        setContent("");
        setExpert("");
        setSelectedCategory("");
        setThumbnail(null);
        toast.success("Post created successfully!");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error?.message || "Request failed");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URI}/categories/all`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
        }
      );
      const data = await res.json();
      setCategoryList(data.categories || []);
    } catch (error) {
      toast.error(error?.message || "Failed to load categories");
    }
  };

  useEffect(() => {
    if (location.pathname === "/create-post") {
      fetchCategory();
    }
  }, [location.pathname]);

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      ["clean"],
    ],
  };

  if (isLoading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <form onSubmit={handleSubmit}>
          <section className="flex md:flex-row flex-col items-center justify-between md:gap-8 gap-3">
            <div className="md:w-[70%] w-full">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                autoFocus
                className="text-gray-100 w-full bg-gray-800 py-2 px-3 rounded-lg border border-gray-600 shadow outline-0"
                placeholder="Blog Title"
              />
            </div>

            <div className="w-full md:w-1/3">
              <select
                id="categorySelect"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 appearance-none text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 px-4 py-2"
              >
                <option value="Uncategozized" className="text-gray-400">
                  Select Category
                </option>
                {categoryList.length === 0 ? (
                  <option>No categories</option>
                ) : (
                  categoryList.map((cate, idx) => (
                    <option key={idx} value={cate?.slug} className="text-white">
                      {cate?.categoryName}
                    </option>
                  ))
                )}
              </select>
            </div>
          </section>

          <section className="mt-4 w-full h-96">
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              theme="snow"
              modules={modules}
              className="h-80 mb-8 !outline-none text-white quill-editor"
            />
          </section>

          {/* Image Upload */}
          <section className="mt-4">
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Preview"
                className="w-40 h-28 object-cover rounded border border-gray-600 mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="bg-gray-600 rounded-lg p-2 w-full"
            />
          </section>

          {/* Expert, Metadata, Tags */}
          <section className="flex md:flex-row md:mt-4 mt-16 flex-col items-center justify-between gap-8">
            <textarea
              rows={2}
              value={expert}
              onChange={(e) => setExpert(e.target.value)}
              className="border border-gray-800 w-full p-2 rounded-lg outline outline-green-800"
              placeholder="Expert (short summary)"
            ></textarea>
            <textarea
              rows={2}
              className="border border-gray-800 w-full p-2 rounded-lg outline outline-green-800"
              placeholder="Meta data (optional)"
            ></textarea>
            <textarea
              rows={2}
              className="border border-gray-800 w-full p-2 rounded-lg outline outline-green-800"
              placeholder="Tags (optional)"
            ></textarea>
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
