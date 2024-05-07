import axios from 'axios';
import { axiosInstance, axiosInstanceWithToken } from './instances';
/* 
axiosInstanceWithToken.interceptors.response.use(
    response => {
        console.log('uaa');

        return response;
    },
    async error => {
        console.log('uaaa');

        if (error.response.status === 401) {
            console.log('I`m here?');

            const refreshedToken = await refreshToken();

            localStorage.setItem('token', refreshedToken);
            error.config.headers.Authorization = `Bearer ${refreshedToken}`;
            return axios.request(error.config);
        }

        // Если это не ошибка аутентификации, просто передаем ошибку дальше
        return Promise.reject(error);
    },
);

const refreshToken = async () => {
    const response = await axiosInstance.post('/refresh', null, {
        withCredentials: true,
    });
    return response.data.accessToken;
};
 */
