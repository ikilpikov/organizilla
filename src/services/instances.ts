import axios from 'axios';

const AUTHBASE = import.meta.env.VITE_API_GETWAY_URL;
export const axiosInstance = axios.create({
    baseURL: AUTHBASE + '/api/v1/auth',
});

export const axiosInstanceWithToken = axios.create({
    baseURL: AUTHBASE + '/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

axiosInstanceWithToken.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        console.log(`Bearer ${localStorage.getItem('token')}`);

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

const TRELLO_API_KEY = import.meta.env.VITE_TRELLO_API_KEY;
export const axiosTrelloInstance = axios.create({
    baseURL: `https://api.trello.com/1/boards/`,
    params: {
        key: TRELLO_API_KEY,
    },
});
