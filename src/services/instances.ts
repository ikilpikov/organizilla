import axios from 'axios';
import { getAccessToken, setAccessToken } from '../utils/accessTokenActions';

const AUTHBASE = import.meta.env.VITE_API_GETWAY_URL;

export const axiosInstance = axios.create({
    baseURL: AUTHBASE + '/api/v1/auth',
    withCredentials: true,
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
        console.log(token);

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
        console.log(error.response.status);
        if (error.response.status === 401) {
            console.log('ku');
            const accessToken = await refreshToken();
            console.log(accessToken, 'accessToken');

            setAccessToken(accessToken);
            error.config.headers.Authorization = `Bearer ${accessToken}`;
            return axios.request(error.config);
        }

        // Если это не ошибка аутентификации, просто передаем ошибку дальше
        return Promise.reject(error);
    },
);

const refreshToken = async () => {
    console.log('refresh');
    try {
        const response = await axiosInstance.post('/refresh', null, {
            withCredentials: true,
        });
        console.log(response);

        return response.data.accessToken;
    } catch (error) {
        console.log(error);
    }
};
