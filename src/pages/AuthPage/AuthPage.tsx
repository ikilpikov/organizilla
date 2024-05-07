import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuth from '../../hooks/useAuth';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import { useRegisterErrorsStore } from '../../store';
import { schema, UserAuth } from '../../schemas/authSchema';
import logo from '../../assets/logo.png';
import openEye from '../../assets/icons/openEye.svg';
import closeEye from '../../assets/icons/closeEye.svg';
import styles from '../../pages/RegistrationPage/RegistrationPage.module.scss';
const AuthPage = () => {
    const [showPassword, setShowPassword] = useState([false, false]);
    const error = useRegisterErrorsStore(state => state.error);
    const setError = useRegisterErrorsStore(state => state.setError);
    const { mutate } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<UserAuth>({ mode: 'onChange', resolver: zodResolver(schema) });

    const formSubmit = () => {
        const authData = getValues();
        mutate(authData);
    };
    useEffect(() => setError(''), [setError]);
    return (
        <>
            <img src={logo} alt="logo" className={styles.logo} />
            <form className={styles.authForm} onSubmit={handleSubmit(formSubmit)}>
                <ErrorMessage message={error} />
                <input type="text" placeholder="Логин" {...register('login')} />
                {errors.login?.message && <ErrorMessage message={errors.login?.message} />}
                <div className={styles.authForm__password}>
                    <input
                        type={showPassword[0] ? 'text' : 'password'}
                        placeholder="Пароль"
                        {...register('password')}
                    />
                    <img
                        src={showPassword[0] ? openEye : closeEye}
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword([!showPassword[0], showPassword[1]])}
                    />
                </div>
                {errors.password?.message && <ErrorMessage message={errors.password?.message} />}
                <button>Войти</button>
                <Link to={'/registration'} className={styles.authForm__navlink}>
                    Нет аккаунта? Зарегистрируйтесь!
                </Link>
            </form>
        </>
    );
};

export default AuthPage;
