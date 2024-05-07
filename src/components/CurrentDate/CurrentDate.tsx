import { getCurrentDate, getGreeting } from '../../utils/date';
import styles from './CurrentDate.module.scss';
const CurrentDate = () => {
    const date = getCurrentDate();
    const greeting = getGreeting();
    return (
        <div className={styles.currentDate}>
            <p>{date}</p>
            <p>
                {greeting}, {localStorage.getItem('username')}
            </p>
        </div>
    );
};

export default CurrentDate;
