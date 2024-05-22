import { FC } from 'react';
import CreateCardForm from '../CreateCardForm/CreateCardForm';
import plusBlack from '../../../assets/icons/plusBlack.svg';
import styles from '../CreateCard.module.scss';
import { useShowActionStore } from '../../../store';

interface ICreateCardButton {
    listId: number;
    boardId: string;
}
const CreateCardButton: FC<ICreateCardButton> = ({ listId, boardId }) => {
    const showAddCard = useShowActionStore(state => state.showAddCard);
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);
    return (
        <>
            {showAddCard !== listId && (
                <button className={styles.addCard} onClick={() => setShowAddCard(listId)}>
                    <img src={plusBlack} alt="plus" width={20} />
                    <span>Добавить карточку</span>
                </button>
            )}

            {showAddCard === listId && <CreateCardForm listId={listId} boardId={boardId} />}
        </>
    );
};

export default CreateCardButton;
