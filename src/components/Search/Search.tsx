import search from '../../assets/icons/search.svg';
import styles from './Search.module.scss';
const Search = () => {
    return (
        <>
            <h3>Search</h3>
            <img src={search} alt="search" width={20} className={styles.search__icon} />
        </>
    );
};

export default Search;
