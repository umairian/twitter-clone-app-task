import axios from "axios";

const BASE_URL = "http://127.0.0.1:4000/api"

export const axiosInstance = axios.create({
    baseURL: BASE_URL
});
