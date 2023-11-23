import axios from "./axios";

export const getReviewsRequest = id => axios.get(`/reviews/${id}`);