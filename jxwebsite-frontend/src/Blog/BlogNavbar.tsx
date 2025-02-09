import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { BlogTitle, BlogTitleById } from './BlogTitle'; // 確保引入正確的文件
import './BlogNavbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface BlogNavbarProps {
  onItemClick: (subject : string , content: string, createtime: string, updatetime: string) => void;
}


interface BlogTitleDTO {
  id: number;
  subject: string;
  createtime: string;
}

interface Title {
  id: number;
  subject: string;
  blogTitleDTO: BlogTitleDTO;
  createtime: string;
  updatetime: string | null;
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
        onItemClick(content.subject , content.content, content.createtime, content.updatetime);
      }
    } catch (error) {
      console.error(`Error fetching content for ID ${id}:`, error);
    }
  };

 // 分组标题：将相同的 blogTitleDTO（大标题）分为一组
 const groupedTitles = titles.reduce((acc, title) => {
  const group = acc.find((group) => group.subject === title.blogTitleDTO.subject);
  if (group) {
    group.children.push(title); // 将小标题（title）添加到对应的组
  } else {
    acc.push({
      subject: title.blogTitleDTO.subject,
      children: [title], // 新建组并添加第一个小标题
    });
  }
  return acc;
}, [] as { subject: string; children: Title[] }[]);

return (
  <div className="navbar-container">
    {groupedTitles.map((group) => (
      <Card key={group.subject} title={group.subject}>
        {group.children.map((title) => (
          <p
            key={title.id}
            onClick={() => handleClick(title.id)}
            className={`navbar-item ${activeId === title.id ? 'active' : ''}`}
          >
            <FontAwesomeIcon icon={faArrowRight} /> &nbsp;&nbsp;
            {title.subject}
            <br />
            <span
              style={{
                fontSize: '0.8rem',
                color: 'gray', /* 当前项目文字颜色 */
                marginLeft: '10px',
                textDecoration: 'underline',
              }}
            >
              {title.createtime ? new Date(title.createtime).toLocaleString() : '无日期'}
            </span>
          </p>
        ))}
      </Card>
    ))}
  </div>
);
};

export default BlogNavbar;