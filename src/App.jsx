import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./page/Dashboard/Dashboard";
import Cookies from "js-cookie";

import CreatePost from "./page/Posts/CreatePost/CreatePost";

import PageNotFound from "./components/ErrorPage/PageNotFound";
import EditPost from "./page/Posts/AllPost.jsx/EditPost";
import SignIn from "./page/auth/signin/SignIn";
import { ToastContainer } from "react-toastify";
import Signup from "./page/auth/signup/Signup";
import ForgotPassword from "./page/auth/ForgetPassword/ForgetPassword";
import Comments from "./page/Comments/Comments";
import UserManagement from "./page/UserManagements/UserManagement";
import Setting from "./page/Settining/Setting";
import CreateCategory from "./components/Category/CreateCategory.jsx";
import CategoryGrid from "./components/Category/Categories.jsx";
import Posts from "./page/Posts/AllPost.jsx/Posts.jsx";

const PublicRoutes = ({ children }) => {
  const Token = Cookies.get("accessToken");
  return Token ? <Navigate to="/" /> : children;
};

const PrivateRoutes = ({ children }) => {
  const Token = Cookies.get("accessToken");
  return Token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public routes  */}

        {/* login routes */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <SignIn />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoutes>
              <Signup />
            </PublicRoutes>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoutes>
              <ForgotPassword />
            </PublicRoutes>
          }
        />

        {/* private routes */}
        {/* home page or dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
        <Route
          path="/blog-post"
          element={
            <PrivateRoutes>
              <Posts />
            </PrivateRoutes>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoutes>
              <CreatePost />
            </PrivateRoutes>
          }
        />
        <Route
          path={"/category/new"}
          element={
            <PrivateRoutes>
              <CreateCategory />
            </PrivateRoutes>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoutes>
              <CategoryGrid />
            </PrivateRoutes>
          }
        />
        {/* edit post */}
        <Route
          path={"/edit-post/:slug"}
          element={
            <PrivateRoutes>
              <EditPost />
            </PrivateRoutes>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoutes>
              <PageNotFound />
            </PrivateRoutes>
          }
        />
        <Route
          path="/comments"
          element={
            <PrivateRoutes>
              <Comments />
            </PrivateRoutes>
          }
        />
        <Route
          path="/user-management"
          element={
            <PrivateRoutes>
              <UserManagement />
            </PrivateRoutes>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoutes>
              <Setting />
            </PrivateRoutes>
          }
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
