import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { BlogTitle, BlogTitleById } from './BlogTitle'; // 確保引入正確的文件
import './BlogNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowRight , faEye , faCheck } from '@fortawesome/free-solid-svg-icons';

interface BlogNavbarProps {
  onItemClick: (content: string, createtime: string,updatetime: string ) => void;  // 更新為包含 createtime
}

interface Title {
  id: number;
  subject: string;
  children: { id: number; subject: string; createtime: string ; }[];  // 添加 createtime 屬性
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
      // 傳遞 content 和 createtime
      onItemClick(content.content, content.createtime , content.updatetime);
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
              <FontAwesomeIcon icon={faArrowRight} />&nbsp;&nbsp;
              {child.subject} <br />
              {/* 顯示 createtime */}
              <span style={{ fontSize: '0.8rem', color: 'gray', marginLeft: '10px' , textDecoration: 'underline' }}>
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