import { BiSolidCategory } from "react-icons/bi";
import {
  FaBlog,
  FaCog,
  FaDashcube,
  FaUserAlt,
  FaUsers,
  FaChartLine,

  FaComments,
} from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdCategory } from "react-icons/md";

const menuList = [
  {
    name: "Dashboard",
    path: "/",
    icon: <FaDashcube />,
  },
  {
    name: "Posts",
    path: "/blog-post",
    icon: <FaBlog />,
  },
  {
    name: "Create Blog",
    path: "/create-post",
    icon: <IoMdAddCircle />,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: <BiSolidCategory />,
  },
  {
    name: "Comments",
    path: "/comments",
    icon: <FaComments />,
  },
  {
    name: "User Management",
    path: "/user-management",
    icon: <FaUsers />,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: <FaChartLine />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
];

export { menuList };
