import axios from 'axios';
import Swal from 'sweetalert2';

const axiosapi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
});

axiosapi.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token"); // 從 sessionStorage 取得 token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosapi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error){
    if(error.response && error.response.status && error.response.response === 403){
      sessionStorage.clear();
      Swal.fire({
        text : "權限不足重新登入",
        icon : error
      }).then(function() {
        window.location.href = "../secure/Login";
      });
      return Promise.reject();
    }
    return Promise.reject(error);
  }
);


export default axiosapi;
