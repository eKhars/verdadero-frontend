import axios from "./axios";

export const updateClientRequest = (id, data) => axios.put(`/clients/${id}`, data)