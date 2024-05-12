import { useTranslation } from 'react-i18next';
import Confetti from '../../../Confetti/Confetti';
import CheckMark from '../../CheckMark/CheckMark';
import styles from './SuccessRegister.module.scss';
import ContinueBtn from '../../ContinueBtn/ContinueBtn';
const SuccessRegisterModal = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <Confetti />
            <div className={styles.successModal}>
                <CheckMark />
                <h2>{t('successRegister.emailConfirmed')}</h2>
                <p>{t('successRegister.wish')}</p>
                <ContinueBtn />
            </div>
        </div>
    );
};

export default SuccessRegisterModal;
