import { FC, useState } from 'react';
import CreateCardForm from '../CreateCardForm/CreateCardForm';
import plusBlack from '../../../assets/icons/plusBlack.svg';
import styles from '../CreateCard.module.scss';

interface ICreateCardButton {
    listId: number;
    boardId: string;
}
const CreateCardButton: FC<ICreateCardButton> = ({ listId, boardId }) => {
    const [isAddCard, setIsAddCard] = useState(false);
    return (
        <>
            {!isAddCard && (
                <button className={styles.addCard} onClick={() => setIsAddCard(true)}>
                    <img src={plusBlack} alt="plus" width={20} />
                    <span>Добавить карточку</span>
                </button>
            )}
            {isAddCard && (
                <CreateCardForm setIsAddCard={setIsAddCard} listId={listId} boardId={boardId} />
            )}
        </>
    );
};

export default CreateCardButton;
