import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './BoardCover.module.scss';

interface IBoardCoverProps {
    background: string;
    name: string;
    id: number;
}
const BoardCover: FC<IBoardCoverProps> = ({ background, name, id }) => {
    const navigator = useNavigate();
    const openBoard = () => {
        navigator(`/board/${id}`);
    };
    return (
        <>
            <div
                className={styles.boardCover}
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                onClick={() => openBoard()}
            >
                <p className={styles.boardCover__name}>{name}</p>
            </div>
        </>
    );
};

export default BoardCover;
