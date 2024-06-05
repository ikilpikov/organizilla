import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CreateCardForm from '../CreateCardForm/CreateCardForm';
import { useShowActionStore } from '../../../store';
import plusBlack from '../../../assets/icons/plusBlack.svg';
import styles from '../CreateCard.module.scss';

interface ICreateCardButton {
    listId: number;
    boardId: string;
}
const CreateCardButton: FC<ICreateCardButton> = ({ listId, boardId }) => {
    const showAddCard = useShowActionStore(state => state.showAddCard);
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);
    const { t } = useTranslation();
    return (
        <>
            {showAddCard !== listId && (
                <button className={styles.addCard} onClick={() => setShowAddCard(listId)}>
                    <img src={plusBlack} alt="plus" width={20} />
                    <span>{t('cardActions.addCard.title')}</span>
                </button>
            )}

            {showAddCard === listId && <CreateCardForm listId={listId} boardId={boardId} />}
        </>
    );
};

export default CreateCardButton;
