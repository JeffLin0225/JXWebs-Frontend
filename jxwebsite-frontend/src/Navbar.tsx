import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import './Navbar.css';
import { faGithub , faBlogger} from '@fortawesome/free-brands-svg-icons'; // 正確導入 GitHub 圖標
import { faHome, faStar , faPenToSquare ,faSun , faMoon,faUser,faRightToBracket,faRightFromBracket} from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [activeKey, setActiveKey] = useState('');
  const [isNightMode, setIsNightMode] = useState(false); // 狀態來切換夜間模式
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));
  const [username, setUsername] = useState<string | null>(null);
  const [authority, setAuthority] = useState<string | null>(null);

  useEffect(() => {
    // 🔹 確保 Navbar 會更新
    const updateAuthState = () => {
      const token = sessionStorage.getItem("token");
      setIsLoggedIn(!!token);
      setUsername(sessionStorage.getItem("username"));
      setAuthority(sessionStorage.getItem("authority"));
    };

    updateAuthState(); // 初始時更新
  }, []);

  
  const handleLogout = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      text: "您將需要重新登入",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "是的，登出！"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear(); 
        // window.location.href = "/";  // 使用 window.location.href 跳轉
        setIsLoggedIn(false); // 更新狀態
        Swal.fire({
          title: "已登出！",
          text: "您已成功登出。",
          icon: "info",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

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
          onClick={() => handleClick('writeblog')}
        >
        <FontAwesomeIcon icon={faPenToSquare} />  寫blog
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

        {isLoggedIn ? (
        <>
          <div className="navbar-item" style={{ background: 'linear-gradient(to bottom, rgb(236, 127, 236),rgb(203, 29, 52))'}}  >
          <FontAwesomeIcon icon={faUser} />  {username} ({authority})
          </div>
          <div className="navbar-item" style={{ background: 'linear-gradient(to bottom, rgb(236, 127, 236),rgb(203, 29, 52))'}} onClick={handleLogout}>
          <FontAwesomeIcon icon={faRightFromBracket} /> 登出
          </div>
        </>
        ) : (
          <div className="navbar-item" style={{ background: 'linear-gradient(to bottom, rgb(117, 215, 224), #115a0d)' }} onClick={() => handleClick('login')} >
            <FontAwesomeIcon icon={faRightToBracket} /> 登入
          </div>
        )}

        
      </div>
    </nav>
  );
};

export default Navbar;