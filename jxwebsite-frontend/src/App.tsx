import React from 'react';
import Navbar from './Navbar';
import RouterComponent from './router'; // 引入路由組件

const App: React.FC = () => {
  return (
    <div> 
      {/* 置頂導航欄 */} 
      <div style={{marginTop : '10px'}}></div>
      <Navbar /> 
      <div style={{ paddingTop: '64px' }}> {/* 路由顯示 */} <RouterComponent /> </div>
    
    </div>
  );
};

export default App;