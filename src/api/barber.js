import axios from "./axios";

export const getBarbersRequest = async () => axios.get("/barberShops");
export const getBarberRequest = async (id) => axios.get(`/barbershop/${id}`);
export const getUserBarberShopsRequest = async () => axios.get("/user-barbershops");
export const searchBarbersShopsRequest = async (query) => axios.get("/barbershop/search", query );

export const createBarberRequest = async (barber) => axios.post("/barbershop", barber);
export const logoBarberRequest = async (id, data) => axios.post(`/barbershop/${id}/logo`, data);

export const updateBarberRequest = async (id, data) => axios.put(`/barbers/${id}`, data);
export const deleteBarberRequest = async (id) => axios.delete(`/barbers/${id}`);