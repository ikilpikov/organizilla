import { useVisibilityStore } from '../../store';
import styles from './ChangeHeaderItems.module.scss';
const ChangeHeaderItems = () => {
    const {
        //isVisibleSearch,
        isVisibleHotKey,
        //  isVisibleNotification,
        isVisibleProfile,
        isVisibleSelectTheme,
        isVisibleCreate,
        isVisibleImport,
        isVisiblePomodoro,
        //setSearchVisible,
        setIsVisibleCreate,
        setIsVisibleImport,
        setIsVisiblePomodoro,
        setSelectThemeVisible,
        // setNotificationVisible,
        setHotKeyVisible,
        setProfileVisible,
    } = useVisibilityStore();

    return (
        <div className={styles.changeHeaderItems}>
            {/*  <div>
                <input type="checkbox" checked={isVisibleSearch} onChange={setSearchVisible} />
                <p>Search</p>
            </div> */}
            <div>
                <input type="checkbox" checked={isVisibleCreate} onChange={setIsVisibleCreate} />
                <p>Create</p>
            </div>

            <div>
                <input
                    type="checkbox"
                    checked={isVisibleSelectTheme}
                    onChange={setSelectThemeVisible}
                />
                <p>SelectTheme</p>
            </div>
            <div>
                <input
                    type="checkbox"
                    checked={isVisiblePomodoro}
                    onChange={setIsVisiblePomodoro}
                />
                <p>Pomodoro</p>
            </div>
            <div>
                <input type="checkbox" checked={isVisibleImport} onChange={setIsVisibleImport} />
                <p>Import</p>
            </div>
            {/* <div>
                <input
                    type="checkbox"
                    checked={isVisibleNotification}
                    onChange={setNotificationVisible}
                />
                <p>Notifications</p>
            </div> */}
            <div>
                <input type="checkbox" checked={isVisibleHotKey} onChange={setHotKeyVisible} />
                <p>HotKeys</p>
            </div>
            <div>
                <input type="checkbox" checked={isVisibleProfile} onChange={setProfileVisible} />
                <p>Profile</p>
            </div>
        </div>
    );
};

export default ChangeHeaderItems;
