import React from 'react';
import styles from './UserProfileSettings.module.scss';
import useUserData from '../../hooks/useUserData';
import { useNavigate } from 'react-router-dom';
import { setAccessToken } from '../../utils/accessTokenActions';
const UserProfileSettings = () => {
    const { data } = useUserData();
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('username');
        document.documentElement.removeAttribute('app-theme');
        setAccessToken('');
        navigate('/auth');
    };

    return (
        <div className={styles.userProfileSettings}>
            <div>
                <div className={styles.userProfileSettings__item}>
                    <div className={styles.userProfileSettings__item_name}>
                        <h4>Name</h4>
                        {localStorage.getItem('username')}
                    </div>
                    {/* <button>Edit username</button> */}
                </div>
                <div className={styles.userProfileSettings__item}>
                    <div className={styles.userProfileSettings__item_email}>
                        <h4>Email</h4>
                        {data?.data?.email}
                    </div>

                    {/* <button>Edit email</button> */}
                </div>
            </div>
            {/*  <div className={styles.userProfileSettings__item}>
                <div className={styles.userProfileSettings__item_password}>
                    <h4>Пароль</h4>
                </div>

                <button>Edit password</button>
            </div> */}
            <div className={styles.userProfileSettings__item}>
                <button
                    className={styles.userProfileSettings__item__logout}
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default UserProfileSettings;
