import axios from "./axios";

export const getUserAppointmentsRequest = async () => axios.get(`/user-appointments`);
export const getBarberAppointmentsRequest = async (id) => axios.get(`/barber-appointments/${id}`);
export const createAppointmentRequest = async (data) => axios.post("/appointment", data); 