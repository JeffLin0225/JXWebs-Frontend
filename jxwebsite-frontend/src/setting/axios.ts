import axios from 'axios';
import Swal from 'sweetalert2';

const axiosapi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000
});

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
