import React from 'react';
import Navbar from './Navbar';
import RouterComponent from './router'; // 引入路由組件
import  { useState } from 'react';

const App: React.FC = () => {

  const [showOverlay, setShowOverlay] = useState(true); // 控制覆蓋層顯示
  const [animateOverlay, setAnimateOverlay] = useState(true); // 控制動畫效果

  const handleOverlayClick = () => {
    setAnimateOverlay(false); // 切換為離場動畫
    setTimeout(() => setShowOverlay(false), 1000); // 延遲移除覆蓋層，等待動畫完成
  };

  return (
    <div >
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
      {/* 導航欄 */}
      <div>
      <Navbar />

      </div>
      
      {/* 主內容 */}
      <div style={{ paddingTop: '85px' }}>
        <RouterComponent />
      </div>


    </div>
  );
};

export default App;