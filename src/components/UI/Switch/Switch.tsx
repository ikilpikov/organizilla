import { FC } from 'react';
import styles from './Switch.module.scss';
interface ISwitchProps {
    isActive: boolean;
    toggleActive: () => void;
}
const Switch: FC<ISwitchProps> = ({ isActive, toggleActive }) => {
    return (
        <>
            <input
                className={styles.switch__checkbox}
                id={`switch-new`}
                type="checkbox"
                checked={isActive}
                onChange={toggleActive}
            />
            <label className={styles.switch__label} htmlFor={`switch-new`}>
                <span className={styles.switch__button} />
            </label>
        </>
    );
};

export default Switch;
