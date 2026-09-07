import axios from 'axios';
import Cookies from 'js-cookie';

const API = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  (request) => {
    const token = Cookies.get('token');

    if (!token) {
      return request;
    }
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  },
  (error) => { return Promise.reject(error) }
);


export default API;