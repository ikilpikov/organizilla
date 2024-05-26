import { FC } from 'react';
import { useVisibilityStore } from '../../../store';
import BurgerMenu from '../../UI/BurgerMenu/BurgerMenu';
import SelectTheme from '../../SelectTheme/SelectTheme';
import NotificationsComponent from '../../NotificationsComponent/NotificationsComponent';
import Search from '../../Search/Search';
import question from '../../../assets/icons/question.svg';
import profile from '../../../assets/icons/profile.svg';
import importIcon from '../../../assets/icons/import.svg';
import pomodoro from '../../../assets/icons/pomodoro.svg';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

interface IHeaderProps {
    fullWidth?: boolean;
}
const Header: FC<IHeaderProps> = ({ fullWidth }) => {
    const {
        isVisibleSearch,
        isVisibleHotKey,
        isVisibleNotification,
        isVisibleProfile,
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
                    <button onClick={() => navigator('/create-board')}>Create</button>
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
                {isVisibleHotKey && (
                    <img
                        src={question}
                        alt="question"
                        width={30}
                        className={styles.question__icon}
                    />
                )}
                {isVisibleProfile && (
                    <img src={profile} alt="profile" width={30} className={styles.profile__icon} />
                )}
            </div>
        </header>
    );
};

export default Header;
