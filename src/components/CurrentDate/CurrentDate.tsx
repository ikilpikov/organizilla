import { useTranslation } from 'react-i18next';
import { getCurrentDate, getGreeting } from '../../utils/date';
import styles from './CurrentDate.module.scss';

const CurrentDate = () => {
    const { t } = useTranslation();
    const date = getCurrentDate();
    const greeting = getGreeting();

    return (
        <div className={styles.currentDate}>
            <p>{date}</p>
            <p>
                {t(greeting)}, {localStorage.getItem('username')}
            </p>
        </div>
    );
};

export default CurrentDate;
