import React, { useState } from 'react';
import axiosapi from "../setting/axios";
import './Login.css'; // 引入 CSS 樣式
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';  // 引入 useNavigate

// interface LoginFormProps {
//   onLogin: (username: string) => void;
// }

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // 使用 useNavigate

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    axiosapi.defaults.headers.authorization = "";
    sessionStorage.clear();
    event.preventDefault();
    try {
        if (!username || !password) {
          Swal.fire('請輸入用戶名和密碼', '', 'warning');
          return false;
        }
      const response = await axiosapi.post('/login', { username, password });
      const token = response.data.token;
      const loggedInUser = response.data.username;
      const authority = response.data.authority;

      console.log(response.data);
      if (token) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('username', loggedInUser); // 儲存使用者名稱
        sessionStorage.setItem('authority', authority); // 儲存權限
        // onLogin(username);
        Swal.fire('登入成功！', '', 'success');
        window.location.href = "/";  // 使用 window.location.href 跳轉
      } else {
        Swal.fire('登入失敗', '', 'error');
      }
    } catch (error) {
      console.log(error);
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
