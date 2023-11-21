import axios from "axios"
const API = import.meta.env.VITE_BACKEND_URL;

export const registerRequest = user => axios.post(`${API}/barhalla/register`, user)
export const loginRequest = user => axios.post(`${API}/barhalla/login`, user)