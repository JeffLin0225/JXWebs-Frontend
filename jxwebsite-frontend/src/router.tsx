// routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import WriteBlog from './pages/WriteBlog';
import Login from './secure/Login';

const RouterComponent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/writeblog" element={<WriteBlog />} />
      <Route path="/login" element={<Login onLogin={function (username: string): void {
        throw new Error('Function not implemented.');
      } } />} />
    </Routes>
  );
};

export default RouterComponent;
