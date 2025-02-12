import React from 'react';  
import  { useState } from 'react';
import jxIndex from '../assets/jxIndex.jpg';

import '../About/AboutMe.css';
import me from '../imgg/me.jpg';      
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEnvelope} from '@fortawesome/free-solid-svg-icons';

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
              style={{
                backgroundColor:'linear-gradient(135deg, #b0c7df,rgb(225, 199, 238))',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${jxIndex})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <h1 className="overlay-title">歡迎來到阿賢的網站！</h1>
              <p className="overlay-text animate__animated animate__bounce animate__infinite">
                ( 點擊!!! )  進入網站，探索更多內容。
              </p>
            </div>
    )}

    <div className="home-container" >
      <h1 className="animate__animated animate__bounce animate__infinite  hello "  >歡迎來到阿賢的網站!!!</h1>
      <p className="home-description">
      我是阿賢，一位熱愛程式設計和技術創新的開發者。
      在這個網站上，我將分享我的學習心得和實踐經驗，
      </p>
      
      {/* <img src={jxIndex}  alt="Home" style={{borderRadius:'15px'}} /> */}

      <div className="about-container">
      <div className="about-content">
        <div className="about-section">
          <div className="about-text">
          <strong><FontAwesomeIcon icon={faEnvelope} /> Email : f900225@gmail.com </strong>
                      <h2 className="about-title">自我介紹一下 ：</h2>
            <p className="about-description">
              我是阿賢，從剛畢業就迷惘的轉職軟體工程師，變為一位熱愛程式設計和學習技術的開發者。
              在這個網站上，我將分享我的學習心得和實踐經驗，並且希望能夠幫助其他對於程式設計技術領域的朋友們。
              這個網站不僅是我學習和成長的記錄，更是一個與大家交流和分享的平台。
              我期待與您一起探索技術，並共同進步！
            </p>
            <p className="about-description textt">
              （ 上面的言論有點官腔 ）其實做這個網站的目的就是單純覺得
              Google 部落格難用，所以乾脆自己搞一個。
              而且我想紀錄以及練習我會的技術，把它放到實際應用中。
              目前還很菜，持續進步中！！！至於怎麼架網站就...問 ChatGPT 吧！
            </p>
          </div>
          <div className="about-image-container">
            <img
              className="about-image"
              src={me}              
              alt="我的圖片"
            />
          <p className="image-caption">『 然後這個不是我 』</p>
          </div>
        </div>
      </div>
    </div>
      
    </div>

  </div>
  );
};

export default Home;
