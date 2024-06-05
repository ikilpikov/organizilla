import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterErrorsStore } from 'store';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import useReg from 'hooks/useReg';
import ErrorMessage from 'components/UI/ErrorMessage/ErrorMessage';
import { IUserReg, schema } from 'schemas/registrationSchema';
import closeEye from 'assets/icons/closeEye.svg';
import logo from 'assets/icons/logo.svg';
import openEye from 'assets/icons/openEye.svg';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
    const { t } = useTranslation();
    const error = useRegisterErrorsStore(state => state.error);
    const setError = useRegisterErrorsStore(state => state.setError);
    const { mutate } = useReg();
    const [showPassword, setShowPassword] = useState([false, false]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<IUserReg>({ mode: 'onChange', resolver: zodResolver(schema) });

    const formSubmit = () => {
        const registrationData = getValues();
        console.log(registrationData);
        mutate(registrationData);
    };
    useEffect(() => {
        setError('');
    }, [setError]);
    return (
        <>
            <img src={logo} alt="logo" className={styles.logo} />

            <form className={styles.authForm} onSubmit={handleSubmit(formSubmit)}>
                <ErrorMessage message={error} />
                <input
                    type="text"
                    placeholder={t('registration.login')}
                    {...register('username')}
                />
                {errors.username?.message && <ErrorMessage message={t(errors.username?.message)} />}
                <input type="text" placeholder={t('registration.email')} {...register('email')} />
                {errors.email?.message && <ErrorMessage message={t(errors.email?.message)} />}
                <div className={styles.authForm__password}>
                    <input
                        type={showPassword[0] ? 'text' : 'password'}
                        placeholder={t('registration.password')}
                        {...register('password')}
                    />
                    <img
                        src={showPassword[0] ? openEye : closeEye}
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword([!showPassword[0], showPassword[1]])}
                    />
                </div>
                {errors.password?.message && <ErrorMessage message={t(errors.password?.message)} />}
                <div className={styles.authForm__password}>
                    <input
                        type={showPassword[1] ? 'text' : 'password'}
                        placeholder={t('registration.password_confirmation')}
                        {...register('confirmPassword')}
                    />
                    <img
                        src={showPassword[1] ? openEye : closeEye}
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword([showPassword[0], !showPassword[1]])}
                    />
                </div>
                {errors.confirmPassword?.message && (
                    <ErrorMessage message={t(errors.confirmPassword?.message)} />
                )}
                <button>{t('registration.register')}</button>
                <Link to={'/auth'} className={styles.authForm__navlink}>
                    {t('registration.haveAccount')}
                </Link>
            </form>
        </>
    );
};

export default RegistrationPage;
