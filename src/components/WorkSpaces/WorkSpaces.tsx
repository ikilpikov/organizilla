import { FC } from 'react';
import BoardCover from '../BoardCover/BoardCover';
import styles from './WorkSpaces.module.scss';
export interface IBoards {
    name: string;
    id: number;
    backgroundImage: string;
    lastActivity: Date;
}
interface IWorkSpacesProps {
    boards: IBoards[];
    isRecent: boolean;
}
const WorkSpaces: FC<IWorkSpacesProps> = ({ boards, isRecent }) => {
    let filteredBoards: IBoards[] | undefined;
    if (isRecent) {
        boards.sort((a, b) => {
            return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        });
        filteredBoards = boards.slice(0, 4);
    } else {
        filteredBoards = [...boards].sort((a, b) => a.name.localeCompare(b.name));
    }

    return (
        <div className={`${styles.workSpaces} ${isRecent && styles.workSpaces__recent}`}>
            {filteredBoards?.map((board, index) => (
                <BoardCover
                    key={index}
                    id={board.id}
                    name={board.name}
                    background={board.backgroundImage}
                />
            ))}
        </div>
    );
};

export default WorkSpaces;
