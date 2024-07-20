import axios from "./axios.js";

export const signUpRequest = (user) => axios.post(`/signup`, user);

export const logInRequest = (user) => axios.post(`/login`, user);

export const logOutRequest = () => axios.post("/logout");

export const verifyTokenRequest = () => axios.get("/verify");

export const verifyStatus = (id) => axios.get(`/verify_status/${id}`);
