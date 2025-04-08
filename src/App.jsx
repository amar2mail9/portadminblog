import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './page/Dashboard/Dashboard';

import AllPost from './page/Posts/AllPost.jsx/AllPost';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path='/blog-post' element={<AllPost />} />
      </Routes>
    </BrowserRouter>
  );
};



export default App