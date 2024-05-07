import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSendConfirmCode from '../../hooks/useSendConfirmCode';
import EmailCode from '../../components/EmailCode/EmailCode';
import ResendCode from '../../components/ResendCode/ResendCode';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import { useEmailDataStore } from '../../store';
import leftArrow from '../../assets/icons/leftArrow.svg';
import styles from './MailCodePage.module.scss';
const MailCodePage = () => {
    const { mutate } = useSendConfirmCode();
    const navigator = useNavigate();
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
                <img src={leftArrow} width={'40px'} onClick={() => navigator(-1)} />
                <h2>Введите код</h2>
            </div>
            {emailError && <ErrorMessage message={emailError}></ErrorMessage>}
            <EmailCode />
            <button
                disabled={emailCode.length < 4}
                className={`${styles.button} ${emailCode.length == 4 ? styles.active : ''}`}
                onClick={() => sendCode()}
            >
                Отправить код
            </button>
            <ResendCode />
        </div>
    );
};

export default MailCodePage;
