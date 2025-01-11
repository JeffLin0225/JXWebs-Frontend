import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub , faBlogger} from '@fortawesome/free-brands-svg-icons'; // 正確導入 GitHub 圖標
import { faHome, faStar ,faSun , faMoon} from '@fortawesome/free-solid-svg-icons';


import './Navbar.css';

const Navbar: React.FC = () => {
  const [activeKey, setActiveKey] = useState('');
  const [isNightMode, setIsNightMode] = useState(false); // 狀態來切換夜間模式
  const navigate = useNavigate();

  const handleClick = (key: string) => {
    setActiveKey(key);
    navigate(`/${key}`);
  };

  const toggleNightMode = () => {
    setIsNightMode(prev => !prev);
    document.body.classList.toggle('night-mode', !isNightMode); // 切換主體的背景顏色
  };

  return (
    <nav className={`navbar ${isNightMode ? 'night' : 'day'}`}>
      <div className="navbar-items">
        <div
          className={`navbar-item ${activeKey === '' ? 'active' : ''}`} style={{textDecoration : 'none'}}
          onClick={() => handleClick('')}
        >
          <FontAwesomeIcon icon={faHome} /> 首頁        
        </div>
        <div
          className={`navbar-item ${activeKey === 'about' ? 'active' : ''}`} style={{textDecoration : 'none'}}
          onClick={() => handleClick('about')}
        >
          <FontAwesomeIcon icon={faStar} /> 關於我
        </div>
        <div
          className={`navbar-item ${activeKey === 'blog' ? 'active' : ''}`} style={{textDecoration : 'none'}}
          onClick={() => handleClick('blog')}
        >
          <FontAwesomeIcon icon={faBlogger} />  部落格
         
        </div>
        <div
          className={`navbar-item ${activeKey === 'writeblog' ? 'active' : ''}`} style={{textDecoration : 'none'}}
          onClick={() => handleClick('blog')}
        >
          寫blog
        </div>
        <div
  className={`navbar-item ${activeKey === 'github' ? 'active' : ''}`}
  style={{ textDecoration: 'none' }}
>
  <a 
    href="https://github.com/JeffLin0225"
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: 'inherit', textDecoration: 'none' }} // 保持與其他navbar項目一致的樣式
  >
    <FontAwesomeIcon icon={faGithub} /> GitHub
  </a>
</div>
        <div
          className="navbar-item toggle-mode"
          onClick={toggleNightMode}
        >
          {isNightMode ? <FontAwesomeIcon icon={faSun}/> : <FontAwesomeIcon icon={faMoon} />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;