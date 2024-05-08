import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { AxiosError } from 'axios';
import { sendConfirmationEmail } from '../services/mail.service';
import { useEmailDataStore } from '../store';
const useSendConfirmationEmail = () => {
    const setEmailError = useEmailDataStore(state => state.setEmailError);
    const { t } = useTranslation();
    return useMutation({
        mutationFn: (email: string) => sendConfirmationEmail(email),
        onSuccess: () => {},
        onError: (_: AxiosError, variables) => {
            if (variables == '') setEmailError(t('mailCode.emailError'));
        },
    });
};
export default useSendConfirmationEmail;
