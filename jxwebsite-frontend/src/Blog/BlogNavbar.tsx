import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { BlogTitle, BlogTitleById } from './BlogTitle'; // 確保引入正確的文件
import './BlogNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface BlogNavbarProps {
  onItemClick: (content: string, createtime: string, updatetime: string) => void;
}

interface Title {
  id: number;
  subject: string;
  children: { id: number; subject: string; createtime: string }[];
}

const BlogNavbar: React.FC<BlogNavbarProps> = ({ onItemClick }) => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await BlogTitle();
        setTitles(result);
      } catch (error) {
        console.error('Error fetching titles:', error);
      }
    };
    getData();
  }, []);

  const handleClick = async (id: number) => {
    setActiveId(id);
    try {
      const content = await BlogTitleById(id);
      if (content) {
        onItemClick(content.content, content.createtime, content.updatetime);
      }
    } catch (error) {
      console.error(`Error fetching content for ID ${id}:`, error);
    }
  };

  return (
    <div className="navbar-container">
      {titles.map((title) => (
        <Card key={title.id} title={title.subject}>
          {title.children.map((child) => (
            <p
              key={child.id}
              onClick={() => handleClick(child.id)}
              className={`navbar-item ${activeId === child.id ? 'active' : ''}`}
            >
              <FontAwesomeIcon icon={faArrowRight} /> &nbsp;&nbsp;
              {child.subject}
              <br />
              <span
                style={{
                  fontSize: '0.8rem',
                  color: 'gray', /* 當前項目文字顏色 */
                  marginLeft: '10px',
                  textDecoration: 'underline',
                }}
              >
                {child.createtime ? new Date(child.createtime).toLocaleString() : '無日期'}
              </span>
            </p>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default BlogNavbar;