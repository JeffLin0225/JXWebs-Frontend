import axios from 'axios';
import Swal from 'sweetalert2';

const axiosapi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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
    if(error.response && error.response.status  === 401){
      sessionStorage.clear();
      Swal.fire({
        text : "請先登入！",
        icon : error,
        showConfirmButton: true, 
      }).then(function(result) {
      if (result.isConfirmed) {
        window.location.href = "../Login";
      }
      });
      return Promise.reject();
    }
    if(error.response && error.response.status  === 403){
      sessionStorage.clear();
      Swal.fire({
        text : "權限不足要重新登入嗎？",
        icon : error,
        showConfirmButton: true, 
        showCancelButton:true,
      }).then(function(result) {
      if (result.isConfirmed) {
        window.location.href = "../Login";
      }
              return Promise.reject();

      });
    }
    return Promise.reject(error);
  }
);


export default axiosapi;
