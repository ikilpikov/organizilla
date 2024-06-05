import { useVisibilityStore } from 'store';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import NotificationsComponent from 'components/NotificationsComponent/NotificationsComponent';
import Search from 'components/Search/Search';
import SelectTheme from 'components/SelectTheme/SelectTheme';
import BurgerMenu from 'components/UI/BurgerMenu/BurgerMenu';
import importIcon from 'assets/icons/import.svg';
import pomodoro from 'assets/icons/pomodoro.svg';
import profile from 'assets/icons/profile.svg';
import question from 'assets/icons/question.svg';
import styles from './Header.module.scss';

interface IHeaderProps {
    fullWidth?: boolean;
}
const Header: FC<IHeaderProps> = ({ fullWidth }) => {
    const { t } = useTranslation();
    const {
        isVisibleSearch,
        // isVisibleHotKey,
        isVisibleNotification,
        // isVisibleProfile,
        isVisibleSelectTheme,
        isVisibleCreate,
        isVisibleImport,
        isVisiblePomodoro,
    } = useVisibilityStore();
    const navigator = useNavigate();
    return (
        <header className={`${styles.header} ${fullWidth ? '' : styles.header__fullWidth}`}>
            <div className={styles.header__burger}>
                <BurgerMenu />
            </div>
            <div className={styles.header__items}>
                {isVisibleCreate && (
                    <button onClick={() => navigator('/create-board')}>
                        {t('sideMenu.create')}
                    </button>
                )}
                {isVisibleSearch && <Search />}
                {isVisibleSelectTheme && <SelectTheme />}
                {isVisibleNotification && <NotificationsComponent />}
                {isVisiblePomodoro && (
                    <img
                        src={pomodoro}
                        width={30}
                        className={styles.question__icon}
                        onClick={() => navigator('/pomodoro')}
                    />
                )}
                {isVisibleImport && (
                    <img
                        src={importIcon}
                        width={30}
                        className={styles.question__icon}
                        onClick={() => navigator('/import')}
                    />
                )}
                {/*  {isVisibleHotKey && (
                    <img
                        src={question}
                        alt="question"
                        width={30}
                        className={styles.question__icon}
                    />
                )} */}
                {/*  {isVisibleProfile && (
                    <img src={profile} alt="profile" width={30} className={styles.profile__icon} />
                )} */}
            </div>
        </header>
    );
};

export default Header;
