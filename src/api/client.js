import axios from "./axios";

export const updateClientRequest = async (id, data) => axios.put(`/client/${id}`, data)