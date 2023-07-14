import axios from 'axios';
const url = API__URL
export const instance = axios.create({
   baseURL:url
  })
function setAuthToken(token){
   console.log(token);
   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default setAuthToken;