import { FC } from 'react';
import { IExtendedCard } from '../../types/entityTypes';
import { useNavigate } from 'react-router-dom';
import { useShowActionStore } from '../../store';
import styles from './SearchContainer.module.scss';
interface ISearchContainerProps {
    cards: IExtendedCard[];
    setSearchValue: (searchValue: string) => void;
    setFilteredCards: (filteredCards: []) => void;
}
const SearchContainer: FC<ISearchContainerProps> = ({
    cards,
    setSearchValue,
    setFilteredCards,
}) => {
    const navigator = useNavigate();
    const setShowCardBody = useShowActionStore(state => state.setShowCardBody);
    const setShowSearchCard = useShowActionStore(state => state.setShowSearchCard);
    return (
        <div className={styles.searchContainer}>
            {cards.map((card: IExtendedCard) => (
                <div
                    key={card.id}
                    onClick={() => {
                        navigator(`/board/${card.boardId}`);
                        setSearchValue('');
                        setFilteredCards([]);
                        setShowCardBody(card.id);
                        setShowSearchCard(card.id);
                    }}
                >
                    <div className={styles.searchContainer__content}>
                        <h4>{card.name}</h4>
                        <p>
                            {card.boardName}: {card.listName}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchContainer;
