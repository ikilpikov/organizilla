import { axiosInstance } from './instances';

export const sendConfirmationEmail = async (email: string) => {
    const response = await axiosInstance.post('/send-confirmation-email', {
        email,
    });
    return response;
};

export interface IConfirmData {
    email: string;
    emailCode: string;
}
export const confirmEmail = async ({ email, emailCode }: IConfirmData) => {
    const response = await axiosInstance.post('/confirm-email', {
        email,
        secretCode: emailCode,
    });
    return response;
};
