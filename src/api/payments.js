import axios from "./axios";

export const paypalPaymentRequest = () => axios.get('/create-order')