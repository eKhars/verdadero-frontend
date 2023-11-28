import axios from "./axios";

export const getUserReviewsRequest = async (id) => axios.get(`/reviews/${id}`);