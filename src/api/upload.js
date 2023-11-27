import axios from "./axios";

export const uploadImageRequest = formData => axios.post('/upload', formData)