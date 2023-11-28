import axios from "./axios";

export const createReviewRequest = async (id, data) => axios.post(`/reviews/${id}`, data);
export const getUserReviewsRequest = async (id) => axios.get(`/reviews/${id}`);
export const getBarberReviewsRequest = async (id) => axios.get(`/barber-reviews/${id}`);
export const deleteReviewRequest = async (id) => axios.delete(`/review/${id}`);