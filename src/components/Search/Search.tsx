import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import searchIcon from '../../assets/icons/search.svg';
import styles from './Search.module.scss';
const Search = () => {
    const { t } = useTranslation();
    const [searchValue, setSearchValue] = useState('');
    const search = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
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
                />
            </div>
        </div>
    );
};

export default Search;
