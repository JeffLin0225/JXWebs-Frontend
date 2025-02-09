import React from 'react';
import Navbar from './Navbar/Navbar';
import RouterComponent from './Navbar/router';

const App: React.FC = () => {

  return (
    <div >
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