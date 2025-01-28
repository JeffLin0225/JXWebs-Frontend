import React, { useState } from 'react';
import axiosapi from 'axios';
import './Login.css'; // 引入 CSS 樣式
import Swal from 'sweetalert2';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        if (!username || !password) {
          Swal.fire('請輸入用戶名和密碼', '', 'warning');
          return false;
        }
      const response = await axiosapi.post('/login', { username, password });
      const token = response.data.token;
      if (token) {
        sessionStorage.setItem('jwtToken', token);
        onLogin(username);
        Swal.fire('登入成功！', '', 'success');
      } else {
        Swal.fire('登入失敗', '', 'error');
      }
    } catch (error) {
      Swal.fire('無效的用戶名或密碼', '', 'error');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label>帳號 : </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>密碼 : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">登入</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
