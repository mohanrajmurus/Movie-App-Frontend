import axios from 'axios';
// eslint-disable-next-line no-undef
const url = API__URL
const axiosClient = axios.create({
   baseURL:url
  })
axiosClient.interceptors.request.use((config) => {
   const token = JSON.parse(sessionStorage.getItem('user'))?.token;
   if(token){
      config.headers.Authorization = `Bearer ${token}`
   }
   return config;
},(error) => {
   return Promise.reject(error);
 })

export default axiosClient;
