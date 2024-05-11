import { useNavigate } from 'react-router-dom';
import leftArrow from '../../../assets/icons/leftArrow.svg';
import styles from './ArrowBack.module.scss';
const ArrowBack = () => {
    const navigator = useNavigate();
    return (
        <img
            src={leftArrow}
            width={'40px'}
            onClick={() => navigator(-1)}
            className={styles.arrowBack}
        />
    );
};

export default ArrowBack;
