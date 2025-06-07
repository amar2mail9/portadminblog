import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";

const PreviewCategory = ({ handlePreviewClose, slug  }) => {
  const [data, setdata] = useState({});
  const fectData = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URI}/category/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      }
    );
    const data1 = await res.json();

    console.log(data1);
    setdata(data1);
  };

  useEffect(() => {
    fectData();
  }, [slug]);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[500px] h-[500px] bg-gray-800 border border-gray-700 rounded-lg p-4">
        <div className="flex justify-end">
          <button onClick={handlePreviewClose}>
            <IoMdCloseCircle className="text-2xl text-pink-600" />
          </button>
        </div>
        {/* Category Name */}
        <h2 className="text-white text-2xl font-semibold mb-2 uppercase">
          {data.category?.categoryName}
        </h2>

        <p className="text-gray-400 text-sm md:line-clamp-2 line-clamp-1 mb-4">
          {data.category?.description}
        </p>

        {/* Image */}
        <div className="mb-4">
          <img
            src={data.category?.featuredImage}
            alt={data?.category?.categoryName}
            className="w-full h-[300px] object-cover rounded-md"
          />
        </div>

        {/* Status and Count */}
        <div className="flex justify-between items-center">
          {/* Status */}
          <span
            className={`px-2 py-1 text-xs rounded-full ${
              data.category?.isPublished ? "bg-green-500" : "bg-red-500"
            } text-white`}
          >
            {data.category?.isPublished ? "Public" : "Private"}
          </span>

          {/* Count */}
          <span className="text-gray-300 text-sm">
            {data.category?.count || 0} Items
          </span>
        </div>
      </div>
    </div>
  );
};

export default PreviewCategory;
