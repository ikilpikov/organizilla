import Confetti from '../../../Confetti/Confetti';
import CheckMark from '../../CheckMark/CheckMark';
import { useSuccessRegisterStore } from '../../../../store';
import styles from './SuccessRegister.module.scss';
const SuccessRegisterModal = () => {
    const setSuccessRegisterVisible = useSuccessRegisterStore(
        state => state.setSuccessRegisterVisible,
    );
    return (
        <div className={styles.container}>
            <Confetti />
            <div className={styles.successModal}>
                <CheckMark />
                <h2>Почта потверждена успешно!</h2>
                <p>Приятной работы с Organizilla</p>
                <button onClick={() => setSuccessRegisterVisible(false)}>Продолжить</button>
            </div>
        </div>
    );
};

export default SuccessRegisterModal;
