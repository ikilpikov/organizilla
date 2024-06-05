import { useTranslation } from 'react-i18next';
import trello from 'assets/icons/trello.svg';
import styles from '../Trello.module.scss';

const TrelloAuth = () => {
    const { t } = useTranslation();
    return (
        <div className={styles.trelloAuth}>
            <h1>{t('import.title')}</h1>
            <img src={trello} width={'40px'} />
            <h3>{t('import.step1')}</h3>
            <p>{t('import.step1-description')}</p>
            <a
                href="https://trello.com/1/authorize?expiration=1day&name=MyPersonalToken&scope=read&response_type=token&key=6929bf68afa629009200d0945bd97a53"
                target="_blank"
                className={styles.trelloAuth__btn}
            >
                <span> {t('import.auth')}</span>
            </a>
        </div>
    );
};

export default TrelloAuth;
