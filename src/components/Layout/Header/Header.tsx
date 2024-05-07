import BurgerMenu from '../../UI/BurgerMenu/BurgerMenu';
import SelectLangugage from '../../SelectLanguage/SelectLangugage';
import SelectTheme from '../../SelectTheme/SelectTheme';
import NotificationsComponent from '../../NotificationsComponent/NotificationsComponent';
import Search from '../../Search/Search';
import question from '../../../assets/icons/question.svg';
import profile from '../../../assets/icons/profile.svg';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <BurgerMenu />

            <Search />
            <SelectLangugage />
            <SelectTheme />
            <NotificationsComponent />
            <img src={question} alt="question" width={20} />
            <h2>Hot keys</h2>
            <h2>UserPageIcon</h2>
            <img src={profile} alt="profile" width={20} />
        </header>
    );
};

export default Header;
