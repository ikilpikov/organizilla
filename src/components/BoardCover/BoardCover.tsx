import { FC } from 'react';
import styles from './BoardCover.module.scss';
interface IBoardCoverProps {
    background: string;
    name: string;
    id: string;
}
const BoardCover: FC<IBoardCoverProps> = ({ background, name, id }) => {
    const openBoard = () => {
        console.log(id);
    };
    return (
        <>
            <div
                className={styles.boardCover}
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
                onClick={() => openBoard()}
            >
                <p className={styles.boardCover__name}>{name}</p>
            </div>
        </>
    );
};

export default BoardCover;
