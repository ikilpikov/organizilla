import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { authorizationByEmail, authorizationByLogin } from 'services/auth.service';
import { setAccessToken } from 'utils/accessTokenActions';
import { IUserAuth } from 'schemas/authSchema';
import { useRegisterErrorsStore } from '../store';

const useAuth = () => {
    const navigator = useNavigate();
    const { t } = useTranslation();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const setError = useRegisterErrorsStore(state => state.setError);

    return useMutation({
        mutationFn: (data: IUserAuth) => {
            console.log(data);

            if (emailRegex.test(data.login)) return authorizationByEmail(data);
            return authorizationByLogin(data);
        },
        onSuccess: response => {
            const decoded = jwtDecode(response.data.accessToken) as JwtPayload;
            if (decoded.sub) localStorage.setItem('username', decoded.sub);
            console.log(response.data);

            setAccessToken(response.data.accessToken);
            navigator('/');
        },
        onError: (error: AxiosError) => {
            if (error.response?.status == 403) setError(t('auth.authError'));
            else if (error.response?.status === 400) setError(error.response.data as string);
        },
    });
};
export default useAuth;
