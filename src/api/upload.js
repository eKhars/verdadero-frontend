import axios from "./axios";

export const uploadImageRequest = (data) => axios.post('/upload', data)