import axios from "axios";

const api = axios.create({
  baseURL: "https://danbee.ai/chatflow/",
  headers: { "Content-Type": "application/json;charset=UTF-8" }
});



export const DanbeeApi = {
  getWelcome: () =>
    api.post("/welcome.do", {
      chatbot_id: "eb75e679-21a7-4c67-ac48-f7ee22bcb9fc"
    }),
  getAnswer: req =>
    api.post("/engine.do", {
      chatbot_id: "eb75e679-21a7-4c67-ac48-f7ee22bcb9fc",
      input_sentence: req
    })
};
