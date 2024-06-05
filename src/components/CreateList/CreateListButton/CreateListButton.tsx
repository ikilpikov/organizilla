import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateListForm from 'components/CreateList/CreateListForm/CreateListForm';
import plusBlack from 'assets/icons/plusBlack.svg';
import styles from '../CreateList.module.scss';

const CreateListButton = () => {
    const [isAddList, setIsAddList] = useState(false);
    const { t } = useTranslation();
    return (
        <>
            {!isAddList && (
                <button className={styles.addList} onClick={() => setIsAddList(true)}>
                    <img src={plusBlack} alt="plus" width={20} />
                    <span>{t('listActions.addList.title')}</span>
                </button>
            )}
            {isAddList && <CreateListForm setIsAddList={setIsAddList} />}
        </>
    );
};

export default CreateListButton;
