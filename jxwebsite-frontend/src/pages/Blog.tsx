import React, { useState } from 'react';
import BlogNavbar from '../Blog/BlogNavbar';
import '../Blog/Blog.css'; // 確保引入 CSS 檔案

const Blog: React.FC = () => {
  const [currentContent, setCurrentContent] = useState<string | null>(null);
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);
  const [currentCreatetime, setCurrentCreatetime] = useState<string | null>(null);  
  const [currentUpdatetime, setCurrentUpdatetime] = useState<string | null>(null);  


  const handleItemClick = (subject : string , content: string, createtime : string , updatetime : string) => {
    setCurrentContent(content);
    setCurrentSubject(subject);
    setCurrentCreatetime( createtime)
    setCurrentUpdatetime( updatetime)
  };

  return (
    <div  style={{marginTop:'30px'}} className="blog-container">
      <BlogNavbar onItemClick={handleItemClick} />
      <div className="blog-content">
        {currentContent ? (
          <>
            <span style={{ fontSize: 'xx-large', textDecoration: 'underline', color: 'wheat' }}>{currentSubject}</span>&emsp;&emsp;
            <span style={{ fontSize: '0.9rem', color: 'white', textDecoration: 'underline' }}>
              {currentCreatetime ? `發佈時間：${new Date(currentCreatetime).toLocaleString()}` : '無日期'}
            </span>&emsp;&emsp;
            <span style={{ fontSize: '0.9rem', color: 'white', textDecoration: 'underline' }}>
              {currentUpdatetime ? `更新時間：${new Date(currentUpdatetime).toLocaleString()}` : ''}
            </span>
            <div 
              dangerouslySetInnerHTML={{ __html: currentContent }} 
              className="blog-content-html" 
            />
          </>
        ) : (
          <p className="blog-empty-state">請選擇一篇有興趣的文章～</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
