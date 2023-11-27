import axios from "axios";

export const uploadImageRequest = (data) => axios.post('http://localhost:4000/api/upload', data)