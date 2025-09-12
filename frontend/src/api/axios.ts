import axios from 'axios';
import {Environment} from "@/constants/EnvironmentConstants";
import {RunningMode} from "@/constants/RunningMode";

const AxiosInstance = axios.create({
    baseURL: Environment.NODE_ENV == RunningMode.PRODUCTION ? `${Environment.API_URL}/api` : `${Environment.API_URL_DEV}/api`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.code === 'ECONNREFUSED') {
            console.error('Backend server is not running or not accessible');
        } else if (error.response) {
            console.error('API Error Response:', error.response.status, error.response.data);
        } else if (error.request) {
            console.error('API No Response:', error.request);
        } else {
            console.error('API Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;