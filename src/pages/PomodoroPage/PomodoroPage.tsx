import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../../components/Layout/Layout';
import Timer from '../../components/Timer/Timer';
import SelectCard from '../../components/SelectTask/SelectTask';
import styles from './Pomodoro.module.scss';

const PomodoroPage = () => {
    const { t } = useTranslation();
    return (
        <Layout>
            <div className={styles.pomodoro}>
                <div className={styles.pomodoro__timer}>
                    <Timer />
                    <button className={styles.pomodoro__settings}>
                        <Link to={'/settings'}>{t('settings.title')}</Link>
                    </button>
                </div>
                <div className={styles.pomodoro__selectCard}>
                    <SelectCard />
                </div>
            </div>
        </Layout>
    );
};

export default PomodoroPage;
