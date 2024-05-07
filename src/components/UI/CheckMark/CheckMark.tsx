import { useState, useEffect } from 'react';
import checkMark from '../../../assets/animations/checkMark.gif';
import checkMarkCompleted from '../../../assets/checkMarkCompleted.png';
import styles from './CheckMark.module.scss';
const CheckMark = () => {
    const [checkMarkActive, setCheckMarkActive] = useState(true);

    useEffect(() => {
        const animationDuration = 1240; //данные получены на основе анализы gif в специальной утилите

        const timer = setTimeout(() => {
            setCheckMarkActive(false);
        }, animationDuration);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.checkmarkContainer}>
            <img
                src={checkMark}
                alt="успешная регистрация"
                width={60}
                className={`${styles.checkmark} ${
                    checkMarkActive ? styles.active : styles.inActive
                }`}
            />
            <img
                src={checkMarkCompleted}
                alt="успешная регистрация"
                width={60}
                className={`${styles.checkmark} ${
                    checkMarkActive ? styles.inActive : styles.active
                }`}
            />
        </div>
    );
};

export default CheckMark;
