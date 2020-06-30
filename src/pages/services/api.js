import axios from 'axios';

import { getToken } from "./auth"; 



const api = axios.create({
  // baseURL: "http://localhost:3333/",
  baseURL:  "https://app-server-fila-gabriel.herokuapp.com/"
 
})

api.interceptors.request.use(async config => {
  const token = getToken();
   
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
