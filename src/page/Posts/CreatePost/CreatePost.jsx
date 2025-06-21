import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Spinner from "../../../components/Spinner.jsx";
import { Editor } from "@tinymce/tinymce-react";

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
    if (file) setThumbnail(file);
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
      <div className="bg-white p-6 rounded-xl shadow-md max-w-5xl mx-auto">
        <form onSubmit={handleSubmit}>
          {/* Title and Category */}
          <section className="flex md:flex-row flex-col items-center justify-between md:gap-6 gap-4 mb-6">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              autoFocus
              className="w-full md:w-3/4 outline-0 text-gray-900 bg-gray-100 py-2 px-4 rounded-lg border border-gray-300 focus:ring-1 focus:ring-purple-200"
              placeholder="Blog Title"
            />

            <select
              id="categorySelect"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-1/4 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2"
            >
              <option value="Uncategorized" className="text-gray-700">
                Select Category
              </option>
              {categoryList.length === 0 ? (
                <option>No categories</option>
              ) : (
                categoryList.map((cate, idx) => (
                  <option key={idx} value={cate?.slug}>
                    {cate?.categoryName}
                  </option>
                ))
              )}
            </select>
          </section>

          {/* Quill Editor */}
          <section className="mb-6">
            <Editor
              apiKey="your-api-key"
              value={content}
              onEditorChange={(newContent) => setContent(newContent)}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "help",
                  "wordcount",
                  "codesample",
                  "exportword",
                  "importword",
                  "markdown",
                  "a11ychecker",
                  "emoticons",
                  "pageembed",
                  "footnotes",
                  "spellchecker",
                  "ai",
                  "mentions",
                ],
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | align lineheight | \
      bullist numlist checklist outdent indent | link image media table | emoticons charmap codesample | \
      removeformat | help | exportword importword markdown fullscreen code",
                tinycomments_mode: "embedded",
                tinycomments_author: "Author",
                mergetags_list: [
                  { value: "First.Name", title: "First Name" },
                  { value: "Email", title: "Email" },
                ],
                ai_request: (request, respondWith) =>
                  respondWith.string(() =>
                    Promise.reject("AI assistant integration needed")
                  ),
              }}
            />

            {/* <ReactQuill
              value={content}
              onChange={handleContentChange}
              theme="snow"
              modules={modules}
              className="quill-editor notailwind"
            /> */}
          </section>

          {/* Thumbnail Upload */}
          <section className="mb-6">
            {thumbnail && (
              <img
                src={URL.createObjectURL(thumbnail)}
                alt="Preview"
                className="w-40 h-28 object-cover rounded border border-gray-300 mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="file:bg-indigo-600 file:text-white file:rounded file:px-4 file:py-2 file:border-none bg-white border border-gray-300 rounded w-full text-gray-800"
            />
          </section>

          {/* Expert, Meta, Tags */}
          <section className="flex flex-col md:flex-row gap-4 mb-6">
            <textarea
              rows={2}
              value={expert}
              onChange={(e) => setExpert(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500"
              placeholder="Expert (short summary)"
            />
            <textarea
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500"
              placeholder="Meta data (optional)"
            />
            <textarea
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-green-500"
              placeholder="Tags (optional)"
            />
          </section>

          <button
            type="submit"
            className="w-full py-3 px-6  bg-gradient-to-r from-indigo-600 to-purple-800 transition-all duration-300 delay-150 text-white font-medium rounded-lg cursor-pointer hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-800 hover:scale-105"
          >
            Create Post
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;
