import Spinner from '../../Spinner/Spinner';
import trello from '../../../../assets/icons/trello.svg';
import styles from './ImportDataModal.module.scss';
import { useTranslation } from 'react-i18next';
const ImportDataModal = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <img src={trello} width={'40px'} />
            <h2>{t('importModal.importTitle')}</h2>
            <p>{t('importModal.description')}</p>
            <Spinner />
        </div>
    );
};

export default ImportDataModal;
