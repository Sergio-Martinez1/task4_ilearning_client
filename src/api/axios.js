import axios from "axios";

const instance = axios.create({
  baseURL: "https://task4ilearningapi-production.up.railway.app/api",
  withCredentials: true,
});

export default instance;
