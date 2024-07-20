import axios from "./axios.js";

export const getUsers = () => axios.get("/get_users");
export const blockUser = (id) => axios.post(`/block_user/${id}`);
export const unblockUser = (id) => axios.post(`/unblock_user/${id}`);
export const deleteUser = (id) => axios.delete(`/delete_user/${id}`);
