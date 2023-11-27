import axios from "./axios";

export const getBarbersRequest = () => axios.get("/barberShops");
export const getBarberRequest = (id) => axios.get(`/barbershop/${id}`);
export const getUserBarberShopsRequest = (id) => axios.get('/user-barbershops', id);
export const searchBarbersShopsRequest = (query) => axios.get('/barbershop/search', query );
export const createBarberRequest = (barber) => axios.post("/barbers", barber);
export const updateBarberRequest = (id, data) => axios.put(`/barbers/${id}`, data);
export const deleteBarberRequest = (id) => axios.delete(`/barbers/${id}`);