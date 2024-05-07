import { useTheme } from '../../hooks/useTheme';
import Switch from '../UI/Switch/Switch';
import sun from '../../assets/icons/sun.svg';
import moon from '../../assets/icons/moon.svg';
import styles from './SelectTheme.module.scss';

const SelectTheme = () => {
    const { theme, setTheme } = useTheme();
    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };
    return (
        <div className={styles.selectTheme}>
            <img src={sun} alt="sun" width={20} />
            <Switch isActive={theme === 'dark'} toggleActive={toggleTheme} />
            <img src={moon} alt="moon" width={20} />
        </div>
    );
};

export default SelectTheme;
