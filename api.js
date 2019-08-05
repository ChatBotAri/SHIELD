import axios from "axios";

const api = axios.create({
  baseURL: "https://danbee.ai/chatflow/",
  headers: { "Content-Type": "application/json;charset=UTF-8" }
});

export const DanbeeApi = {
  getWelcome: () =>
    api.post("/welcome.do", {
      chatbot_id: "46099720-2e0b-4341-b6c3-cc747e6636c3"
    })
  // getUpComing: () => api.get("/movie/upcoming"),
  // getPopular: () => api.get("/movie/popular"),
  // getMovie: id =>
  //   api.get(`movie/${id}`, {
  //     params: {
  //       append_to_response: "videos"
  //     }
  //   }),
  // searchMovies: term =>
  //   api.get("search/movie", {
  //     params: {
  //       query: term
  //     }
  //   })
};
