import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./page/Dashboard/Dashboard";

import AllPost from "./page/Posts/AllPost.jsx/AllPost";
import CreatePost from "./page/Posts/CreatePost/CreatePost";
import Categories from "./page/Categories/Categories";
import PageNotFound from "./components/ErrorPage/PageNotFound";
import EditPost from "./page/Posts/AllPost.jsx/EditPost";
import SignIn from "./page/auth/signin/SignIn";
import { ToastContainer } from "react-toastify";

const PublicRoutes = ({ children }) => {
  const Token = localStorage.getItem("access-Token");
  return Token ? <Navigate to="/" /> : children;
};

const PrivateRoutes = ({ children }) => {
  const Token = localStorage.getItem("access-Token");
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
              <AllPost />
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
        <Route path="/categories" element={<Categories />} />
        {/* edit post */}
        <Route
          path={"/edit-post/:slug"}
          element={
            <PrivateRoutes>
              <EditPost />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
