import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// This function allows configuring the interceptors with Redux dispatch
// It should be called from a React component or a setup function where useDispatch can be called.
export const setupAxiosInterceptors = (dispatch, logoutAction) => {
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
                // logout
                if (dispatch && logoutAction) {
                    dispatch(logoutAction());
                }
                localStorage.removeItem('userData');
                localStorage.removeItem('token');
                window.location.href = '/login';
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
