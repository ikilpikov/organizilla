import { Link } from 'react-router-dom';
import Layout from '../../components/Layout/Layout';
import Timer from '../../components/Timer/Timer';
import SelectCard from '../../components/SelectCard/SelectCard';
import styles from './Pomodoro.module.scss';

const PomodoroPage = () => {
    return (
        <Layout>
            <div className={styles.pomodoro}>
                <div>
                    <Timer />
                    <button className={styles.pomodoro__settings}>
                        <Link to={'/settings'}>Settings</Link>
                    </button>
                </div>
                <SelectCard />
            </div>
        </Layout>
    );
};

export default PomodoroPage;
