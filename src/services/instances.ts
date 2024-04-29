import axios from "axios";

const AUTHBASE = import.meta.env.VITE_API_GETWAY_URL;
export const axiosInstance = axios.create({
  baseURL: AUTHBASE + "/api/v1/auth",
});
