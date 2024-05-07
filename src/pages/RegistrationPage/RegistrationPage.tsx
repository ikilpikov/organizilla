import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useReg from '../../hooks/useReg';
import ErrorMessage from '../../components/UI/ErrorMessage/ErrorMessage';
import { useRegisterErrorsStore } from '../../store';
import { schema, UserReg } from '../../schemas/registrationSchema';
import logo from '../../assets/logo.png';
import openEye from '../../assets/icons/openEye.svg';
import closeEye from '../../assets/icons/closeEye.svg';
import styles from './RegistrationPage.module.scss';
const RegistrationPage = () => {
    const error = useRegisterErrorsStore(state => state.error);
    const setError = useRegisterErrorsStore(state => state.setError);
    const { mutate } = useReg();
    const [showPassword, setShowPassword] = useState([false, false]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<UserReg>({ mode: 'onChange', resolver: zodResolver(schema) });

    const formSubmit = () => {
        const registrationData = getValues();
        console.log(registrationData);
        mutate(registrationData);
    };
    useEffect(() => setError(''), [setError]);
    return (
        <>
            <img src={logo} alt="logo" className={styles.logo} />

            <form className={styles.authForm} onSubmit={handleSubmit(formSubmit)}>
                <ErrorMessage message={error} />
                <input type="text" placeholder="Логин" {...register('username')} />
                {errors.username?.message && <ErrorMessage message={errors.username?.message} />}
                <input type="text" placeholder="Электронная почта" {...register('email')} />
                {errors.email?.message && <ErrorMessage message={errors.email?.message} />}
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
                <div className={styles.authForm__password}>
                    <input
                        type={showPassword[1] ? 'text' : 'password'}
                        placeholder="Повторите пароль"
                        {...register('confirmPassword')}
                    />
                    <img
                        src={showPassword[1] ? openEye : closeEye}
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword([showPassword[0], !showPassword[1]])}
                    />
                </div>
                {errors.confirmPassword?.message && (
                    <ErrorMessage message={errors.confirmPassword?.message} />
                )}
                <button>Зарегистрироваться</button>
                <Link to={'/auth'} className={styles.authForm__navlink}>
                    Есть аккаунт?
                </Link>
            </form>
        </>
    );
};

export default RegistrationPage;
