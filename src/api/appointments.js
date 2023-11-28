import axios from "./axios";

export const getUserAppointmentsRequest = async (id) => axios.get(`/user-appointments/${id}`);  