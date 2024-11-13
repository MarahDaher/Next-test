import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://my-json-server.typicode.com/MostafaKMilly/demo",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
