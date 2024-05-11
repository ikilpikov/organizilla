import { useMutation } from '@tanstack/react-query';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmEmail } from '../services/mail.service';
import { IConfirmData } from '../services/mail.service';
import { useEmailDataStore, useSuccessRegisterStore } from '../store';
import { setAccessToken } from '../utils/accessTokenActions';

const useSendConfirmCode = () => {
    const navigator = useNavigate();
    const setEmailError = useEmailDataStore(state => state.setEmailError);
    const setSuccessRegisterVisible = useSuccessRegisterStore(
        state => state.setSuccessRegisterVisible,
    );
    return useMutation({
        mutationFn: (confirmData: IConfirmData) => confirmEmail(confirmData),
        onSuccess: response => {
            const decoded = jwtDecode(response.data.accessToken) as JwtPayload;
            if (decoded.sub) localStorage.setItem('username', decoded.sub);

            setAccessToken(response.data.accessToken);
            setSuccessRegisterVisible(true);
            navigator('/');
        },
        onError: (error: AxiosError) => {
            setEmailError(error.response?.data as string);
        },
    });
};
export default useSendConfirmCode;
