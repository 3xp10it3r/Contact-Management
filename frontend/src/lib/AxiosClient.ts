import axios from "axios";

const AxiosClient = axios.create({
  baseURL: process.env.SERVER_BASE_URL || "http://localhost:8000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosClient;
