import axios from 'axios';

const api = axios.create({
  // baseURL: "http://localhost:3000/"
  baseURL:  "https://app-server-fila-gabriel.herokuapp.com/"
})

export default api;
