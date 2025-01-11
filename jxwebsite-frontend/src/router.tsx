// routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import WriteBlog from './pages/WriteBlog';

const RouterComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/writeblog" element={<WriteBlog />} />
      
    </Routes>
  );
};

export default RouterComponent;
