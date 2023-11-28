import axios from "./axios";

export const paypalPaymentRequest = async () => axios.get('/create-order')