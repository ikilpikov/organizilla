import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
const NotFoundPage = () => {
    return (
        <section className={styles.page__404}>
            <div>
                <h1>404</h1>
                <div className={styles.page__404_bg}></div>

                <div className={styles.page__404_text}>
                    <h3>Look like you're lost</h3>
                    <p>The page you are looking for not avaible!</p>
                    <Link to={'/'} className={styles.page__404_button}>
                        Go to Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFoundPage;
