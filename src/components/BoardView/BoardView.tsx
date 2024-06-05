import { FC } from 'react';
import Layout from 'components/Layout/Layout';
import BoardSkeleton from 'components/UI/BoardSkeleton/BoardSkeleton';
import styles from './BoardView.module.scss';

interface IBoardViewProps {
    background: string;
}

const BoardView: FC<IBoardViewProps> = ({ background }) => {
    console.log(background);

    return (
        <div className={styles.boardView}>
            <Layout isView={true}>
                <div
                    className={styles.boardView__content}
                    style={{
                        backgroundImage: `url(${background})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <BoardSkeleton />
                </div>
            </Layout>
        </div>
    );
};

export default BoardView;
