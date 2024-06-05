import { useEmailDataStore } from 'store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useSendConfirmCode from 'hooks/useSendConfirmCode';
import EmailCode from 'components/EmailCode/EmailCode';
import ResendCode from 'components/ResendCode/ResendCode';
import ArrowBack from 'components/UI/ArrowBack/ArrowBack';
import ErrorMessage from 'components/UI/ErrorMessage/ErrorMessage';
import styles from './MailCodePage.module.scss';

const MailCodePage = () => {
    const { t } = useTranslation();
    const { mutate } = useSendConfirmCode();
    const emailCode = useEmailDataStore(state => state.emailCode);
    const email = useEmailDataStore(state => state.email);
    const emailError = useEmailDataStore(state => state.emailError);
    const setEmailError = useEmailDataStore(state => state.setEmailError);
    const sendCode = () => {
        mutate({ email, emailCode });
    };
    useEffect(() => {
        setEmailError('');
        return () => {
            localStorage.removeItem('email-data');
        };
    }, [setEmailError]);
    return (
        <div className={styles.mailCode}>
            <div className={styles.mailCode__header}>
                <ArrowBack />
                <h2>{t('mailCode.inputCode')}</h2>
            </div>
            {emailError && <ErrorMessage message={emailError}></ErrorMessage>}
            <EmailCode />
            <button
                disabled={emailCode.length < 4}
                className={`${styles.button} ${emailCode.length == 4 ? styles.active : ''}`}
                onClick={() => sendCode()}
            >
                {t('mailCode.sendCode')}
            </button>
            <ResendCode />
        </div>
    );
};

export default MailCodePage;
