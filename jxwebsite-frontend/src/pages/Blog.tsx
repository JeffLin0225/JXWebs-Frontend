import React, { useState } from 'react';
import BlogNavbar from '../Blog/BlogNavbar';
import '../Blog/Blog.css'; // 確保引入 CSS 檔案

const Blog: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<string | null>(null);

  const handleItemClick = (content: string) => {
    setCurrentContent(content);
  };

  return (
    <div className="blog-container">
      <BlogNavbar onItemClick={handleItemClick} />
      <div className="blog-content">
        {currentContent ? (
          <div dangerouslySetInnerHTML={{ __html: currentContent }} />
        ) : (
          <p>選擇一個項目以顯示內容</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
