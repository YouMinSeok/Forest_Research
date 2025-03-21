import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchBoardPosts = async () => {
  try {
    const response = await api.get("/board/");
    return response.data;
  } catch (error) {
    console.error("게시글 가져오기 실패:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
