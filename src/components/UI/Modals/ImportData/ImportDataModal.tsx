import Spinner from '../../Spinner/Spinner';
import trello from '../../../../assets/icons/trello.svg';
import styles from './ImportDataModal.module.scss';
const ImportDataModal = () => {
    return (
        <div className={styles.container}>
            <img src={trello} width={'40px'} />
            <h2>Импорт данных</h2>
            <p>Подожите немного процесс загрузки может занять некоторое время</p>
            <Spinner />
        </div>
    );
};

export default ImportDataModal;
