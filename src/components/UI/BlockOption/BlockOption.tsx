import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './BlockOption.module.scss';

interface IBlockOptionProps {
    text: string;
    link: string;
    imageLink: string;
}
const BlockOption: FC<IBlockOptionProps> = ({ text, link, imageLink }) => {
    return (
        <div className={styles.externalWrapper}>
            <NavLink to={link}>
                <div className={styles.blockOption}>
                    <div className={styles.blockOption__wrapper}>
                        <div className={styles.blockOption__content}>
                            <img src={imageLink} />
                        </div>
                    </div>
                </div>
                <div className={styles.blockOption__text}>{text}</div>
            </NavLink>
        </div>
    );
};

export default BlockOption;
