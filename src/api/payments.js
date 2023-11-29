import axios from "./axios";

export const paypalPaymentRequest = async () => axios.get('/create-order')
export const stripePaymentRequest = async (data) => axios.post('/create-checkout-session', data)