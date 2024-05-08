import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSendConfirmationEmail from '../../hooks/useSendConfirmationEmail';
import styles from './ResendCode.module.scss';
const SendCode = () => {
    const { t } = useTranslation();
    const [timer, setTimer] = useState(45);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const emailInStorage = localStorage.getItem('email-data');
    let email = '';
    if (emailInStorage !== null) {
        email = JSON.parse(emailInStorage).state.email;
    }

    const { mutate } = useSendConfirmationEmail();
    useEffect(() => {
        if (timer === 0) {
            setIsButtonDisabled(false);
        }
    }, [timer]);

    useEffect(() => {
        let intervalId: number;
        if (isButtonDisabled) {
            intervalId = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [isButtonDisabled]);
    const handleResendCode = () => {
        mutate(email);
        setIsButtonDisabled(true);
        setTimer(45);
    };

    return (
        <button
            className={`${styles.resendCode} ${!isButtonDisabled ? styles.active : ''}`}
            disabled={isButtonDisabled}
            onClick={handleResendCode}
        >
            {isButtonDisabled
                ? t('mailCode.resendCodePrompt', { timer: timer })
                : t('mailCode.resendCode')}
        </button>
    );
};

export default SendCode;
