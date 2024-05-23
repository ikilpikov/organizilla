import { Navigate, useParams } from 'react-router-dom';
import useBoardData from '../../hooks/useBoardData';
import Layout from '../../components/Layout/Layout';
import BoardContainer from '../../components/BoardContainer/BoardContainer';
import styles from './BoardPage.module.scss';

const BoardPage = () => {
    const { id } = useParams();
    const { data, isSuccess, isError } = useBoardData(id || '');

    if (isError) {
        return <Navigate to={'/not-found'} replace />;
    }
    return (
        <Layout>
            {isSuccess && (
                <div
                    className={styles.boardWrapper}
                    style={{
                        backgroundImage: `url(${data?.data.backgroundImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed',
                    }}
                >
                    <BoardContainer id={id!} />
                </div>
            )}
        </Layout>
    );
};

export default BoardPage;
