import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './page/Dashboard/Dashboard';

import AllPost from './page/Posts/AllPost.jsx/AllPost';
import CreatePost from './page/Posts/CreatePost/CreatePost';
import Categories from './page/Categories/Categories';
import PageNotFound from './components/ErrorPage/PageNotFound';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/blog-post' element={<AllPost />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App