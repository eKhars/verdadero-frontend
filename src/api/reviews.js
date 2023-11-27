import axios from "./axios";

export const getUserReviewsRequest = id => axios.get(`/reviews/${id}`);