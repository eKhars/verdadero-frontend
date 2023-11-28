import axios from "./axios";

export const getBarbersRequest = () => axios.get("/barberShops");
export const getBarberRequest = (id) => axios.get(`/barbershop/${id}`);
export const getUserBarberShopsRequest = () => axios.get(`/user-barbershops`);
export const searchBarbersShopsRequest = (query) => axios.get(`/barbershop/search`, query );
export const createBarberRequest = (barber) => axios.post("/barbers", barber);
export const updateBarberRequest = (id, data) => axios.put(`/barbers/${id}`, data);
export const deleteBarberRequest = (id) => axios.delete(`/barbers/${id}`);