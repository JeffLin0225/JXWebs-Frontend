import React, { useState } from 'react';
import BlogNavbar from '../Blog/BlogNavbar';
import '../Blog/Blog.css'; // 確保引入 CSS 檔案

const Blog: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [currentCreatetime, setCurrentCreatetime] = useState<string | null>(null);  
  const [currentUpdatetime, setCurrentUpdatetime] = useState<string | null>(null);  


  const handleItemClick = (content: string, createtime : string , updatetime : string) => {
    setCurrentContent(content);
    setCurrentCreatetime( createtime)
    setCurrentUpdatetime( updatetime)
  };

  return (
    <div className="blog-container">
      <BlogNavbar onItemClick={handleItemClick} />
      <div className="blog-content">
        {currentContent ? (
          <>
          <span style={{ fontSize: '0.9rem', color: 'wheat', textDecoration : 'underline'}}>
          {currentCreatetime ? `發佈時間：${new Date(currentCreatetime).toLocaleString()}` : '無日期'}
          </span>&emsp;	&emsp;
          <span style={{ fontSize: '0.9rem', color: 'wheat', textDecoration : 'underline'}}>
          {currentUpdatetime ? `更新時間：${new Date(currentUpdatetime).toLocaleString()}` : ''}
          </span>
          <div dangerouslySetInnerHTML={{ __html: currentContent }} />
          </>
        ) : (
          <p>選擇一個項目以顯示內容</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
