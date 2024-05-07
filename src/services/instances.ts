import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/accessTokenActions';

const AUTHBASE = import.meta.env.VITE_API_GETWAY_URL;

export const axiosInstance = axios.create({
    baseURL: AUTHBASE + '/api/v1/auth',
});

const TRELLO_API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
export const axiosTrelloInstance = axios.create({
    baseURL: `https://api.trello.com/1/boards/`,
    params: {
        key: TRELLO_API_KEY,
    },
});

export const axiosInstanceWithToken = axios.create({
    baseURL: AUTHBASE + '/api/v1',
});
axiosInstanceWithToken.interceptors.request.use(
    config => {
        const token = getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);
axiosInstanceWithToken.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        console.log(`Bearer ${localStorage.getItem('token')}`);

        if (error.response.status === 401) {
            const refreshedToken = await refreshToken();

            //localStorage.setItem('token', refreshedToken);
            setAccessToken(refreshedToken);
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
