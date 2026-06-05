import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

export async function searchMovies(query, topN = 12) {
  const response = await api.get("/search", {
    params: {
      q: query,
      top_n: topN
    }
  });
  return response.data;
}
