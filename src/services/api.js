import axios from "axios";

const api = axios.create({
  baseURL: "https://images-api.nasa.gov",
});

export default api;