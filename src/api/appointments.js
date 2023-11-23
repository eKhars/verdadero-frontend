import axios from "./axios";

export const getAppointmentsRequest = () => axios.get(`/appointments`);