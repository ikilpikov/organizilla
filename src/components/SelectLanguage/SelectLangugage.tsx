import { useTranslation } from 'react-i18next';
import planet from '../../assets/icons/planet.svg';
import styles from './SelectLanguage.module.scss';
const SelectLangugage = () => {
    const { i18n } = useTranslation();
    const savedLocale = localStorage.getItem('locale') ?? 'ru';
    const changeLanguage = (language: string) => {
        localStorage.setItem('locale', language);
        i18n.changeLanguage(language);
    };
    return (
        <>
            {/* <img src={planet} alt="planet" width={20} className={styles.selectLanguage__icon} /> */}
            <select
                className={styles.selectLanguage__select}
                onChange={event => changeLanguage(event.target.value)}
                defaultValue={savedLocale}
            >
                <option value="en">English</option>
                <option value="ru">Русский</option>
            </select>
        </>
    );
};

export default SelectLangugage;
