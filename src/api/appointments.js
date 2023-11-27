import axios from "./axios";

export const getUserAppointmentsRequest = id => axios.get(`/user-appointments/${id}`);  