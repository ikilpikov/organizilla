import { FC, useEffect, useRef, useState } from 'react';
import useDeleteList from '../../hooks/useDeleteList';
import useClickOutside from '../../hooks/useClickOutside';
import { useShowActionStore } from '../../store';
import cross from '../../assets/icons/cross.svg';
import { ICard, IList } from '../../types/entityTypes';
import useReorderCard from '../../hooks/useReorderCard';
import styles from './ListActions.module.scss';
import useDeleteCard from '../../hooks/useDeleteCard';

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
    const { mutate } = useDeleteList();
    const { mutate: deleteCard } = useDeleteCard();
    const { mutate: mutateCard } = useReorderCard();
    const listActionRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [sortedCards, setSortedCards] = useState(cards); // Состояние для хранения отсортированных карточек
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
            const dateA = new Date(a.lastActivity).getTime();
            const dateB = new Date(b.lastActivity).getTime();
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
                id: card.id,
                previousCardId,
                nextCardId,
                listId: id,
            };
            mutateCard(cardReorder);
        });
        setListData(prevState => {
            const updatedList = prevState.map(prevList => {
                if (prevList.id === list.id) {
                    // Обновляем только текущий список
                    return {
                        ...prevList,
                        cards: sortedCards, // Обновляем карточки в текущем списке
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
                    <h3>Действия со списком</h3>
                    <img src={cross} width={20} onClick={() => setShowListActions(Number(id))} />
                </div>
                <div className={styles.listActions__actions}>
                    <button onClick={() => deleteList()}>Удалить список</button>
                    <button onClick={() => setShowAddCard(id)}>Добавить карточку</button>
                    <button onClick={() => sortCardByLastActivity('new')}>
                        Сортировать по дате создания (сначала новые)
                    </button>
                    <button onClick={() => sortCardByLastActivity('old')}>
                        Сортировать по дате создания (сначала старые)
                    </button>
                    <button onClick={() => sortCardByName()}>Сортировать по названию</button>
                    <button onClick={() => deleteAllCards()}>Удалить все карточки в списке</button>
                </div>
            </div>
        </div>
    );
};

export default ListActions;
