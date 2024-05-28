import { useTranslation } from 'react-i18next';
import BlockOption from '../UI/BlockOption/BlockOption';
import styles from './CreateBoardOptions.module.scss';
import plus from '../../assets/icons/plus.svg';
import importImg from '../../assets/import.png';
import template from '../../assets/template.png';
const CreateBoardOptions = () => {
    const { t } = useTranslation();
    return (
        <>
            <h1 className={styles.createBoard__title}>{t('createBoard.createTitle')}</h1>
            <div className={styles.createBoard__options}>
                <BlockOption
                    text={t('createBoard.createBlank')}
                    link="/create-board/blank"
                    imageLink={plus}
                />
                {/* <BlockOption
                    text={t('createBoard.createTemplate')}
                    link="/create-board/template"
                    imageLink={template}
                /> */}
                <BlockOption
                    text={t('createBoard.importBoard')}
                    link="/import"
                    imageLink={importImg}
                />
            </div>
        </>
    );
};

export default CreateBoardOptions;
