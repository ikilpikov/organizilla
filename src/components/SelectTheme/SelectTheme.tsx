import { useThemeContext } from '../../hooks/useThemeContext';
import Switch from '../UI/Switch/Switch';
import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';
import styles from './SelectTheme.module.scss';

const SelectTheme = () => {
    const { theme, setTheme } = useThemeContext();
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };
    return (
        <div className={styles.selectTheme}>
            <img src={sun} alt="sun" width={20} className={styles.selectTheme__icon} />
            <Switch isActive={theme === 'dark'} toggleActive={toggleTheme} />
            <img src={moon} alt="moon" width={20} className={styles.selectTheme__icon} />
        </div>
    );
};

export default SelectTheme;
