import axios from 'axios'

const axiosInstance = axios.create({ baseURL: "http://localhost:2102/task/", withCredentials: true });

export default axiosInstance;