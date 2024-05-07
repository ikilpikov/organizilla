import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { sendConfirmationEmail } from '../services/mail.service';
import { useEmailDataStore } from '../store';
const useSendConfirmationEmail = () => {
    const setEmailError = useEmailDataStore(state => state.setEmailError);
    return useMutation({
        mutationFn: (email: string) => sendConfirmationEmail(email),
        onSuccess: () => {},
        onError: (_: AxiosError, variables) => {
            if (variables == '') setEmailError('Произошла ошибка! Укажите заново данные');
        },
    });
};
export default useSendConfirmationEmail;
