import axios from 'axios';
// eslint-disable-next-line no-undef
const url = API__URL
export const instance = axios.create({
   baseURL:url
  })
function setAuthToken(token){
   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default setAuthToken;