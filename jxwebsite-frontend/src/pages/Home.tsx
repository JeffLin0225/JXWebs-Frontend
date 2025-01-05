import React from 'react';
import './Home.css';
import me from '../imgg/me.jpg';      // 導入圖片

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">歡迎來到阿賢的網站</h1>
      <p className="home-description">
      我是阿賢，一位熱愛程式設計和技術創新的開發者。
      在這個網站上，我將分享我的學習心得和實踐經驗，並且希望能夠幫助其他對於程式設計技術領域的朋友們。
      這個網站不僅是我學習和成長的記錄，更是一個與大家交流和分享的平台。我期待與您一起探索技術的無限可能，並共同進步！
      </p>

      <p style={{color:'black'}}>好啦！！（ 上面的言論有點官腔 ）</p> 
      <p  style={{color:'black'}}>其實做這個網站的目的就是單純覺得google部落格難用，所以乾脆自己搞一個</p>
      <p  style={{color:'black'}}>而且我想紀錄以及練習我會的技術，把它放到實際應用中</p>
      <p  style={{color:'black'}}>目前還很菜，持續進步中！！！至於怎麼架網站就...問ChatGPT吧！</p>
      <span  style={{color:'black'}}>『 然後這個不是我 』</span>
      
      <img src={me}  alt="Home"  />
      {/* <div className="home-icon-container">
        <img src="https://via.placeholder.com/50" alt="Icon 1" className="home-icon" />
        <img src="https://via.placeholder.com/50" alt="Icon 2" className="home-icon" />
        <img src="https://via.placeholder.com/50" alt="Icon 3" className="home-icon" />
      </div> */}
    </div>
  );
};

export default Home;
