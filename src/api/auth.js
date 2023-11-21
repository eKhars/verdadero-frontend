import axios from "axios"
import { config } from "dotenv";

config();
const API = process.env.BACKEND_URL;

export const registerRequest = user => axios.post(`${API}/register`, user)
export const loginRequest = user => axios.post(`${API}/login`, user)