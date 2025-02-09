import React from 'react';  
import  { useState } from 'react';
import image from '../assets/image.jpg';

import './Home.css';
// import me from '../imgg/me.jpg';      // 導入圖片

const Home: React.FC = () => {
  const [showOverlay, setShowOverlay] = useState(true); // 控制覆蓋層顯示
  const [animateOverlay, setAnimateOverlay] = useState(true); // 控制動畫效果

  const handleOverlayClick = () => {
    setAnimateOverlay(false); // 切換為離場動畫
    setTimeout(() => setShowOverlay(false), 1000); // 延遲移除覆蓋層，等待動畫完成
  };

  return (
  <div style={{marginTop:'50px'}}>
    
    {showOverlay && (
              <div
                className={`overlay animate__animated ${
                  animateOverlay ? 'animate__bounceIn' : 'animate__bounceOutDown'
                }`}
                onClick={handleOverlayClick}
              >
                <h1 className="overlay-title">歡迎來到阿賢的網站！</h1>
                <p className="overlay-text animate__animated animate__bounce animate__infinite">
                  ( 點擊 )進入網站，探索更多內容。
                </p>
              </div>
    )}

    <div className="home-container" >
      <h1 className="animate__animated animate__bounce animate__infinite  hello "  >歡迎來到阿賢的網站!!!</h1>
      <p className="home-description">
      我是阿賢，一位熱愛程式設計和技術創新的開發者。
      在這個網站上，我將分享我的學習心得和實踐經驗，
      </p>
      
      <img src={image}  alt="Home" style={{borderRadius:'15px'}} />
      {/* <div className="home-icon-container">
        <img src="https://via.placeholder.com/50" alt="Icon 1" className="home-icon" />
        <img src="https://via.placeholder.com/50" alt="Icon 2" className="home-icon" />
        <img src="https://via.placeholder.com/50" alt="Icon 3" className="home-icon" />
      </div> */}
    </div>

  </div>
  );
};

export default Home;
