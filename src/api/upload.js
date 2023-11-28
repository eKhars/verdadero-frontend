import axios from "./axios";

export const uploadImageRequest = async (data) => axios.post('/upload', data)
export const uploadLogoBarberRequest = async (data) => axios.post('/upload-logo', data);