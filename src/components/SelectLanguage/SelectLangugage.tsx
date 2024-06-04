import { useTranslation } from 'react-i18next';
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
