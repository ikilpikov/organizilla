import BurgerMenu from '../../UI/BurgerMenu/BurgerMenu';
import SelectTheme from '../../SelectTheme/SelectTheme';
import NotificationsComponent from '../../NotificationsComponent/NotificationsComponent';
import Search from '../../Search/Search';
import question from '../../../assets/icons/question.svg';
import profile from '../../../assets/icons/profile.svg';
import styles from './Header.module.scss';
import { FC } from 'react';

interface IHeaderProps {
    fullWidth?: boolean;
}
const Header: FC<IHeaderProps> = ({ fullWidth }) => {
    return (
        <header className={`${styles.header} ${fullWidth ? '' : styles.header__fullWidth}`}>
            <BurgerMenu />

            <Search />
            <SelectTheme />
            <NotificationsComponent />
            <img src={question} alt="question" width={20} className={styles.question__icon} />
            <img src={profile} alt="profile" width={20} className={styles.profile__icon} />
        </header>
    );
};

export default Header;
