import { FC, useState } from 'react';
import useList from '../../../hooks/useList';
import { useParams } from 'react-router-dom';
interface ICreateListFormProps {
    setIsAddList: (isAddList: boolean) => void;
}
const CreateListForm: FC<ICreateListFormProps> = ({ setIsAddList }) => {
    const { mutate } = useList();
    const [name, setName] = useState('');
    const { id } = useParams();
    console.log(id);

    const addList = () => {
        const listData = { name, boardId: id! };
        console.log(listData);

        mutate(listData);
        setIsAddList(false);
    };
    return (
        <>
            <input
                placeholder="Ввести имя списка"
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <button onClick={() => addList()}>Добавить</button>
            <button onClick={() => setIsAddList(false)}>Закрыть</button>
        </>
    );
};

export default CreateListForm;
