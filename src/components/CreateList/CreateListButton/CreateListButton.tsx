import { useState } from 'react';
import CreateListForm from '../CreateListForm.tsx/CreateListForm';
import plusBlack from '../../../assets/icons/plusBlack.svg';
import styles from '../CreateList.module.scss';

const CreateListButton = () => {
    const [isAddList, setIsAddList] = useState(false);
    return (
        <>
            {!isAddList && (
                <button className={styles.addList} onClick={() => setIsAddList(true)}>
                    <img src={plusBlack} alt="plus" width={20} />
                    <span> Добавить еще один список</span>
                </button>
            )}
            {isAddList && <CreateListForm setIsAddList={setIsAddList} />}
        </>
    );
};

export default CreateListButton;
