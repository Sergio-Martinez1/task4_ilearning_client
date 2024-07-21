import axios from "axios";

const instance = axios.create({
  baseURL: "task4_ilearning_api.railway.internal",
  withCredentials: true,
});

export default instance;
