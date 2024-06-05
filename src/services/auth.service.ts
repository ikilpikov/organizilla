import { IUserAuth } from 'schemas/authSchema';
import { IUserReg } from 'schemas/registrationSchema';
import { axiosInstance } from './instances';

export const registration = async ({ username, email, password }: IUserReg) => {
    const response = await axiosInstance.post('/register', {
        username,
        email,
        password,
    });
    return response;
};
export const authorizationByLogin = async ({ login, password }: IUserAuth) => {
    const response = await axiosInstance.post('/login/username', {
        username: login,
        password,
    });
    return response;
};

export const authorizationByEmail = async ({ login, password }: IUserAuth) => {
    const response = await axiosInstance.post('/login/email', {
        email: login,
        password,
    });
    return response;
};
