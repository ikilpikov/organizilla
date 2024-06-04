import { useTranslation } from 'react-i18next';
import ChangeHeaderItems from '../ChangeHeaderItems/ChangeHeaderItems';
import ChangeSystemFormat from '../ChangeSystemFormat/ChangeSystemFormat';
import PomodoroSettings from '../PomodoroSettings/PomodoroSettings';
import SelectLangugage from '../../SelectLanguage/SelectLangugage';
import SelectTheme from '../../SelectTheme/SelectTheme';
import UserProfileSettings from '../UserProfileSettings/UserProfileSettings';
import styles from './SettingsContainer.module.scss';
const SettingsContainer = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.settings}>
            <h1>{t('settings.title')}</h1>
            <div className={styles.settings__appearance}>
                <h3>{t('settings.appearance.title')}</h3>
                <div className={styles.settings__appearance_language}>
                    <h4>{t('settings.appearance.language.title')}</h4>
                    <SelectLangugage />
                </div>
                <div className={styles.settings__appearance_theme}>
                    <h4>{t('settings.appearance.theme.title')}</h4>
                    <SelectTheme />
                </div>
                <div className={styles.settings__appearance_systemFormat}>
                    <h4>{t('settings.appearance.systemFormat.title')}</h4>
                    <ChangeSystemFormat />
                </div>
            </div>
            <div className={styles.settings__userInfo}>
                <h3>{t('settings.userProfile.title')}</h3>
                <UserProfileSettings />
            </div>
            <div className={styles.settings__header}>
                <h3>{t('settings.headerAppearance')}</h3>
                <ChangeHeaderItems />
            </div>
            <div>
                <h3>{t('settings.pomodoro.title')}</h3>
                <PomodoroSettings />
            </div>
        </div>
    );
};

export default SettingsContainer;
