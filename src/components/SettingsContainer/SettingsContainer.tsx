import SelectLangugage from '../SelectLanguage/SelectLangugage';
import SelectTheme from '../SelectTheme/SelectTheme';
import styles from './SettingsContainer.module.scss';
const SettingsContainer = () => {
    return (
        <div className={styles.settings}>
            <h1>Settings</h1>
            <div className={styles.settings__appearance}>
                <h3>Appearance</h3>
                <div className={styles.settings__appearance_language}>
                    <h4>Language</h4>
                    <SelectLangugage />
                </div>
                <div className={styles.settings__appearance_theme}>
                    <h4>Theme</h4>
                    <SelectTheme />
                </div>
            </div>
            <div className={styles.settings__userInfo}>
                <h3>Профиль пользователя</h3>
                <p>Имя</p>
                <p>Электронная почта</p>
                <p>Пароль</p>
            </div>
            <div className={styles.settings__header}>
                <h3>Настройка заголовка сайта</h3>
                <input type="checkbox" />
                <p>Search</p>
                <input type="checkbox" />
                <p>SelectTheme</p>
                <input type="checkbox" />
                <p>Notifications</p>
                <input type="checkbox" />
                <p>HotKeys</p>
                <input type="checkbox" />
                <p>Profile</p>
            </div>
            <div className={styles.settings__system}>
                <p>Card font-size</p>
                <p>System font-size</p>
                <p>Time format</p>
                <h3>Notifications</h3>
            </div>
            <div className={styles.settings__info}>
                <p>Ask a question</p>
                <p>Organizilla FAQ</p>
                <p>Privacy Policy</p>
            </div>
            <div>
                <h3>Pomodoro settings</h3>
            </div>
        </div>
    );
};

export default SettingsContainer;
