import axios from "axios";

export const uploadImageRequest = (data) => axios.post('http://localhost:3000/api/upload', data)