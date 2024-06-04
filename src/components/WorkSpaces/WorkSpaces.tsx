import { FC } from 'react';
import BoardCover from '../BoardCover/BoardCover';
import { getRecentBoards, sortBoardsByName } from '../../utils/sortBoard';
import { ISortBoards } from '../../types/entityTypes';
import styles from './WorkSpaces.module.scss';

interface IWorkSpacesProps {
    boards: ISortBoards[];
    isRecent: boolean;
}

const WorkSpaces: FC<IWorkSpacesProps> = ({ boards, isRecent }) => {
    const filteredBoards = isRecent ? getRecentBoards([...boards]) : sortBoardsByName([...boards]);

    return (
        <div
            className={`${styles.workSpaces} ${isRecent ? styles.workSpaces__recent : styles.workSpaces__all}`}
        >
            {filteredBoards.map(board => (
                <BoardCover
                    key={board.id}
                    id={board.id}
                    name={board.name}
                    background={board.backgroundImage}
                />
            ))}
        </div>
    );
};

export default WorkSpaces;
