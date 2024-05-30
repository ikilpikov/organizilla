import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import searchIcon from '../../assets/icons/search.svg';
import styles from './Search.module.scss';
import useAllCards from '../../hooks/useAllCards';
import SearchContainer from '../SearchContainer/SearchContainer';
import { IExtendedCard } from '../../types/entityTypes';
import { useShowActionStore } from '../../store';

const Search = () => {
    const { data: allCards = [] } = useAllCards();
    const { t } = useTranslation();
    const [searchValue, setSearchValue] = useState('');
    const [filteredCards, setFilteredCards] = useState<IExtendedCard[]>([]);
    const setShowCardBody = useShowActionStore(state => state.setShowCardBody);

    const search = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);
        filterCards(value);
    };

    const filterCards = (value: string) => {
        if (!value.trim()) {
            setFilteredCards([]);
        } else {
            const filtered: IExtendedCard[] = allCards.filter((card: IExtendedCard) =>
                card.name.toLowerCase().startsWith(value.toLowerCase()),
            );
            setFilteredCards(filtered);
        }
    };

    return (
        <div className={styles.search}>
            <div className={styles.search__container}>
                <img
                    src={searchIcon}
                    alt="search"
                    width={20}
                    className={styles.search__container_icon}
                />
                <input
                    placeholder={t('header.search')}
                    value={searchValue}
                    onChange={event => search(event)}
                    onFocus={() => setShowCardBody(-1)}
                />
            </div>
            {filteredCards.length > 0 && (
                <SearchContainer
                    cards={filteredCards}
                    setSearchValue={setSearchValue}
                    setFilteredCards={setFilteredCards}
                />
            )}
        </div>
    );
};

export default Search;
