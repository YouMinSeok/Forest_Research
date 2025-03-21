// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // FastAPI 서버 주소
  withCredentials: true,            // 쿠키 자동 전송
});

export default api;
