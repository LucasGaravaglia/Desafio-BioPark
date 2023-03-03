import axios from "axios";

export const baseUrlServer = "http://localhost:3333/";

const api = axios.create({
  baseURL: baseUrlServer,
});

export default api;
