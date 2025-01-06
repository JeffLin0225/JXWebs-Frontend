import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { BlogTitle, BlogTitleById } from './BlogTitle'; // 確保引入正確的文件
import './BlogNavbar.css';

interface BlogNavbarProps {
  onItemClick: (content: string) => void;
}

interface Title {
  id: number;
  subject: string;
  children: { id: number; subject: string }[];
}

const BlogNavbar: React.FC<BlogNavbarProps> = ({ onItemClick }) => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      const result = await BlogTitle();
      setTitles(result);
    };
    getData();
  }, []);

  const handleClick = async (id: number) => {
    setActiveId(id);
    const content = await BlogTitleById(id);
    if (content) {
      onItemClick(content.content);
    }
  };

  return (
    <div className="blog-navbar">
      {titles.map((title) => (
        <Card key={title.id} title={title.subject} style={{ marginBottom: 10 }}>
          {title.children.map((child) => (
            <p
              key={child.id}
              onClick={() => handleClick(child.id)}
              className={`navbar-item ${activeId === child.id ? 'active' : ''}`}
            >
              {child.subject}
            </p>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default BlogNavbar;
