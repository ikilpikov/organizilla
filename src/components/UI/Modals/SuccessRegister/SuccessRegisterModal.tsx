import { useTranslation } from 'react-i18next';
import Confetti from 'components/Confetti/Confetti';
import CheckMark from 'components/UI/CheckMark/CheckMark';
import ContinueBtn from 'components/UI/ContinueBtn/ContinueBtn';
import styles from './SuccessRegister.module.scss';

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
