import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
    const { t } = useTranslation();
    return (
        <section className={styles.page__404}>
            <div>
                <h1>404</h1>
                <div className={styles.page__404__bg}></div>

                <div className={styles.page__404__text}>
                    <h3>{t('notfound.title')}</h3>
                    <p>{t('notfound.description')}</p>
                    <Link to={'/'} className={styles.page__404__button}>
                        {t('notfound.back')}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;
