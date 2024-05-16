import { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import useList from '../../../hooks/useList';
import cross from '../../../assets/icons/cross.svg';
import styles from '../CreateList.module.scss';

interface ICreateListFormProps {
    setIsAddList: (isAddList: boolean) => void;
}
const CreateListForm: FC<ICreateListFormProps> = ({ setIsAddList }) => {
    const { mutate } = useList();
    const [name, setName] = useState('');
    const { id } = useParams();

    const addList = () => {
        const listData = { name, boardId: id! };
        mutate(listData);
        setIsAddList(false);
    };
    return (
        <div className={styles.createListForm}>
            <input
                placeholder="Ввести имя списка"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <div className={styles.createListForm__addClose}>
                <button onClick={() => addList()} disabled={!name}>
                    Добавить
                </button>
                <img src={cross} width={30} onClick={() => setIsAddList(false)} />
            </div>
        </div>
    );
};

export default CreateListForm;
