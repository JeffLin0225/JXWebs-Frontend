import React from 'react';
import '../About/AboutWebsite.css';
import jxArch from '../assets/jxArch.png'
import mailArch from '../assets/mailArch.png'


const About: React.FC = () => {
  return (
    <div className="aboutWebsite-container">
      <div className="aboutWebsite-content">
        <h2 className="aboutWebsite-title">系統架構介紹</h2>
        <span className="aboutWebsite-description">這裡是關於我的架構介紹，包括 (這個網站的架構) 與 (未來要做的電子郵件系統) 的運作方式。</span>
       

        <div className="aboutWebsite-image-container">
          <div>
            <p className="aboutWebsiteimage-caption">網站架構設計</p>
            <img src={jxArch} alt="網站架構" className="aboutWebsite-image" />
          </div>
          <div>
            <p className="aboutWebsiteimage-caption">(尚未導入)電郵系統架構</p>
            <img src={mailArch} alt="電郵架構" className="aboutWebsite-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;