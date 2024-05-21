import { FC, useState } from 'react';
import styles from '../CreateCard.module.scss';
import cross from '../../../assets/icons/cross.svg';
import useAddCard from '../../../hooks/useAddCard';
interface ICreateCardFormProps {
    listId: number;
    boardId: string;
    setIsAddCard: (isAddCard: boolean) => void;
}

const CreateCardForm: FC<ICreateCardFormProps> = ({ listId, boardId, setIsAddCard }) => {
    const { mutate } = useAddCard();
    const [cardName, setCardName] = useState('');

    const addList = () => {
        const cardData = { name: cardName, listId, boardId };
        mutate(cardData);
        setIsAddCard(false);
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
                <img src={cross} width={30} onClick={() => setIsAddCard(false)} />
            </div>
        </div>
    );
};

export default CreateCardForm;
