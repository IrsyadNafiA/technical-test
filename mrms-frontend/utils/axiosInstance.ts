import { useAuthStore } from "@/store/useAuthStore";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const   axiosInstance = axios.create({
    baseURL:API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token;

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response?.status === 403) {
            useAuthStore.getState().removeToken();
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;