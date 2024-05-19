import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import search from '../../assets/icons/search.svg';
import styles from './Search.module.scss';
const Search = () => {
    const { t } = useTranslation();

    return (
        <>
            <h3>{t('header.search')}</h3>

            <img src={search} alt="search" width={20} className={styles.search__icon} />
        </>
    );
};

export default Search;
