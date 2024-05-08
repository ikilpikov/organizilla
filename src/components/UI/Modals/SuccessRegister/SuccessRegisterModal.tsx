import { useTranslation } from 'react-i18next';
import Confetti from '../../../Confetti/Confetti';
import CheckMark from '../../CheckMark/CheckMark';
import { useSuccessRegisterStore } from '../../../../store';
import styles from './SuccessRegister.module.scss';
const SuccessRegisterModal = () => {
    const { t } = useTranslation();
    const setSuccessRegisterVisible = useSuccessRegisterStore(
        state => state.setSuccessRegisterVisible,
    );
    return (
        <div className={styles.container}>
            <Confetti />
            <div className={styles.successModal}>
                <CheckMark />
                <h2>{t('successRegister.emailConfirmed')}</h2>
                <p>{t('successRegister.wish')}</p>
                <button onClick={() => setSuccessRegisterVisible(false)}>
                    {t('successRegister.continue')}
                </button>
            </div>
        </div>
    );
};

export default SuccessRegisterModal;
