import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterErrorsStore } from 'store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import styles from 'pages/RegistrationPage/RegistrationPage.module.scss';
import ErrorMessage from 'components/UI/ErrorMessage/ErrorMessage';
import { IUserAuth, schema } from 'schemas/authSchema';
import closeEye from 'assets/icons/closeEye.svg';
import openEye from 'assets/icons/openEye.svg';
import logo from 'assets/logo.png';

const AuthPage = () => {
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState([false, false]);
    const error = useRegisterErrorsStore(state => state.error);
    const setError = useRegisterErrorsStore(state => state.setError);
    const { mutate } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IUserAuth>({ mode: 'onChange', resolver: zodResolver(schema) });

    const formSubmit = () => {
        const authData = getValues();
        mutate(authData);
    };
    useEffect(() => {
        setError('');
    }, [setError]);

    return (
        <>
            <img src={logo} alt="logo" className={styles.logo} />
            <form className={styles.authForm} onSubmit={handleSubmit(formSubmit)}>
                <ErrorMessage message={error} />
                <input type="text" placeholder={t('auth.login')} {...register('login')} />
                {errors.login?.message && <ErrorMessage message={t(errors.login?.message)} />}
                <div className={styles.authForm__password}>
                    <input
                        type={showPassword[0] ? 'text' : 'password'}
                        placeholder={t('auth.password')}
                        {...register('password')}
                    />
                    <img
                        src={showPassword[0] ? openEye : closeEye}
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword([!showPassword[0], showPassword[1]])}
                        alt="show password"
                    />
                </div>
                {errors.password?.message && <ErrorMessage message={t(errors.password?.message)} />}
                <button>{t('auth.enter')}</button>
                <Link to={'/registration'} className={styles.authForm__navlink}>
                    {t('auth.haveAccount')}
                </Link>
            </form>
        </>
    );
};

export default AuthPage;
