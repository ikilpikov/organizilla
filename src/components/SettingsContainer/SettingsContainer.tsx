import ChangeHeaderItems from '../ChangeHeaderItems/ChangeHeaderItems';
import ChangeSystemFormat from '../ChangeSystemFormat/ChangeSystemFormat';
import PomodoroSettings from '../PomodoroSettings/PomodoroSettings';
import SelectLangugage from '../SelectLanguage/SelectLangugage';
import SelectTheme from '../SelectTheme/SelectTheme';
import UserProfileSettings from '../UserProfileSettings/UserProfileSettings';
import styles from './SettingsContainer.module.scss';
const SettingsContainer = () => {
    return (
        <div className={styles.settings}>
            <h1>Настройки</h1>
            <div className={styles.settings__appearance}>
                <h3>Внешний вид системы</h3>
                <div className={styles.settings__appearance_language}>
                    <h4>Язык</h4>
                    <SelectLangugage />
                </div>
                <div className={styles.settings__appearance_theme}>
                    <h4>Тема</h4>
                    <SelectTheme />
                </div>
                <div className={styles.settings__appearance_systemFormat}>
                    <h4>Размер шрифта системы</h4>
                    <ChangeSystemFormat />
                </div>
            </div>
            <div className={styles.settings__userInfo}>
                <h3>User profile</h3>
                <UserProfileSettings />
            </div>
            <div className={styles.settings__header}>
                <h3>Header appearance</h3>
                <ChangeHeaderItems />
            </div>
            <div>
                <h3>Pomodoro settings</h3>
                <PomodoroSettings />
            </div>
        </div>
    );
};

export default SettingsContainer;
