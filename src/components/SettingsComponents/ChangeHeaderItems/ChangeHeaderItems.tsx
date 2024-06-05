import { useVisibilityStore } from 'store';
import { useTranslation } from 'react-i18next';
import styles from './ChangeHeaderItems.module.scss';

const ChangeHeaderItems = () => {
    const {
        isVisibleSearch,
        //isVisibleHotKey,
        //  isVisibleNotification,
        // isVisibleProfile,
        isVisibleSelectTheme,
        isVisibleCreate,
        isVisibleImport,
        isVisiblePomodoro,
        setSearchVisible,
        setIsVisibleCreate,
        setIsVisibleImport,
        setIsVisiblePomodoro,
        setSelectThemeVisible,
        // setNotificationVisible,
        //setHotKeyVisible,
        // setProfileVisible,
    } = useVisibilityStore();
    const { t } = useTranslation();
    return (
        <div className={styles.changeHeaderItems}>
            <div>
                <input type="checkbox" checked={isVisibleCreate} onChange={setIsVisibleCreate} />
                <p>{t('sideMenu.create')}</p>
            </div>
            <div>
                <input type="checkbox" checked={isVisibleSearch} onChange={setSearchVisible} />
                <p>{t('header.search')}</p>
            </div>

            <div>
                <input
                    type="checkbox"
                    checked={isVisibleSelectTheme}
                    onChange={setSelectThemeVisible}
                />
                <p>{t('settings.appearance.theme.title')}</p>
            </div>
            <div>
                <input
                    type="checkbox"
                    checked={isVisiblePomodoro}
                    onChange={setIsVisiblePomodoro}
                />
                <p>{t('sideMenu.pomodoro')}</p>
            </div>
            <div>
                <input type="checkbox" checked={isVisibleImport} onChange={setIsVisibleImport} />
                <p>{t('sideMenu.import')}</p>
            </div>
            {/* <div>
                <input
                    type="checkbox"
                    checked={isVisibleNotification}
                    onChange={setNotificationVisible}
                />
                <p>Notifications</p>
            </div> */}
            {/*    <div>
                <input type="checkbox" checked={isVisibleHotKey} onChange={setHotKeyVisible} />
                <p>HotKeys</p>
            </div> */}
            {/* <div>
                <input type="checkbox" checked={isVisibleProfile} onChange={setProfileVisible} />
                <p>Profile</p>
            </div> */}
        </div>
    );
};

export default ChangeHeaderItems;
