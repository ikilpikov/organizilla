import { FC, useState } from 'react';
import styles from '../CreateCard.module.scss';
import cross from '../../../assets/icons/cross.svg';
import useAddCard from '../../../hooks/useAddCard';
import { useShowActionStore } from '../../../store';
interface ICreateCardFormProps {
    listId: number;
    boardId: string;
}

const CreateCardForm: FC<ICreateCardFormProps> = ({ listId, boardId }) => {
    const { mutate } = useAddCard();
    const [cardName, setCardName] = useState('');
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);

    const addList = () => {
        const cardData = { name: cardName, listId, boardId };
        mutate(cardData);
        setShowAddCard(-1);
    };
    return (
        <div className={styles.createListForm}>
            <input
                placeholder="Введите имя списка"
                value={cardName}
                onChange={event => setCardName(event.target.value)}
            />
            <div className={styles.createListForm__addClose}>
                <button onClick={() => addList()} disabled={!cardName}>
                    Добавить карточку
                </button>
                <img src={cross} width={30} onClick={() => setShowAddCard(-1)} />
            </div>
        </div>
    );
};

export default CreateCardForm;
