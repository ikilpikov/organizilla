import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDeleteList from '../../hooks/useDeleteList';
import useClickOutside from '../../hooks/useClickOutside';
import useReorderCard from '../../hooks/useReorderCard';
import useDeleteCard from '../../hooks/useDeleteCard';
import { useShowActionStore } from '../../store';
import { ICard, IList } from '../../types/entityTypes';
import cross from '../../assets/icons/cross.svg';
import styles from './ListActions.module.scss';

interface IListActions {
    list: IList;
    id: number;
    boardId: string;
    cards: ICard[];
    setListData: (list: IList[]) => void;
}

const ListActions: FC<IListActions> = ({ id, boardId, cards, setListData, list }) => {
    const setShowListActions = useShowActionStore(state => state.setShowListActions);
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);
    const { t } = useTranslation();
    const { mutate } = useDeleteList();
    const { mutate: deleteCard } = useDeleteCard();
    const { mutate: mutateCard } = useReorderCard();
    const listActionRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sortedCards, setSortedCards] = useState(cards);
    useEffect(() => setIsOpen(true), []);
    useClickOutside(listActionRef, () => setShowListActions(-1), isOpen);

    const deleteList = () => {
        mutate({ id, boardId });
        setShowListActions(-1);
    };

    const sortCardByName = () => {
        const newSortedCards = [...sortedCards].sort((a, b) => a.name.localeCompare(b.name));
        setSortedCards(newSortedCards);
        sortCard(newSortedCards);
    };

    const sortCardByLastActivity = (date: 'old' | 'new') => {
        const newSortedCards = [...sortedCards].sort((a, b) => {
            const dateA = new Date(a.dateLastActivity).getTime();
            const dateB = new Date(b.dateLastActivity).getTime();
            return date === 'new' ? dateB - dateA : dateA - dateB;
        });
        setSortedCards(newSortedCards);
        sortCard(newSortedCards);
    };

    const sortCard = (sortedCards: ICard[]) => {
        sortedCards.forEach((card, index) => {
            const previousCardId = index > 0 ? sortedCards[index - 1].id : null;
            const nextCardId = index < sortedCards.length - 1 ? sortedCards[index + 1].id : null;
            const cardReorder = {
                id: card.id.toString(),
                previousCardId,
                nextCardId,
                listId: id.toString(),
            };
            mutateCard(cardReorder);
        });
        setListData((prevState: IList[]) => {
            const updatedList = prevState.map(prevList => {
                if (prevList.id === list.id) {
                    // Update only the current list
                    return {
                        ...prevList,
                        cards: sortedCards, // Update cards in the current list
                    };
                }
                return prevList;
            });
            return updatedList;
        });
    };

    const deleteAllCards = () => {
        list.cards.forEach(card => deleteCard({ id: card.id, boardId }));
    };

    return (
        <div className={styles.listActions}>
            <div ref={listActionRef}>
                <div className={styles.listActions__title}>
                    <h3>{t('listActions.actions.title')}</h3>
                    <img src={cross} width={20} onClick={() => setShowListActions(Number(id))} />
                </div>
                <div className={styles.listActions__actions}>
                    <button onClick={() => deleteList()}>{t('listActions.actions.delete')}</button>
                    <button onClick={() => setShowAddCard(id)}>
                        {t('cardActions.addCard.title')}
                    </button>
                    <button onClick={() => sortCardByLastActivity('new')}>
                        {t('listActions.actions.sort.newest')}
                    </button>
                    <button onClick={() => sortCardByLastActivity('old')}>
                        {t('listActions.actions.sort.oldest')}
                    </button>
                    <button onClick={() => sortCardByName()}>
                        {t('listActions.actions.sort.name')}
                    </button>
                    <button onClick={() => deleteAllCards()}>
                        {t('listActions.actions.deleteAll')}
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ListActions;
