import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useUserData from '../../../hooks/useUserData';
import { setAccessToken } from '../../../utils/accessTokenActions';
import styles from './UserProfileSettings.module.scss';
const UserProfileSettings = () => {
    const { data } = useUserData();
    const navigate = useNavigate();
    const { t } = useTranslation();
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
                        <h4>{t('settings.userProfile.username')}</h4>
                        {localStorage.getItem('username')}
                    </div>
                    {/* <button>Edit username</button> */}
                </div>
                <div className={styles.userProfileSettings__item}>
                    <div className={styles.userProfileSettings__item_email}>
                        <h4>{t('settings.userProfile.email')}</h4>
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
                    {t('settings.userProfile.logout')}
                </button>
            </div>
        </div>
    );
};

export default UserProfileSettings;
