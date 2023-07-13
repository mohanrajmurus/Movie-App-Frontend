import axios from 'axios';
const url = API__URL
const token = JSON.parse(sessionStorage.getItem('user'))?.token
console.log(token);
const instance = axios.create({
 baseURL:url,
 headers:{
    Authorization: `Bearer ${token}`
 }
})

export default instance