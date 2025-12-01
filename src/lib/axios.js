import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 500) {
            // Redirect to the server error page
            window.location.href = '/server-error';
        }
        if (error.response && error.response.status === 401) {
            // Redirect to the server error page
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
