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
    console.log(isRecent);

    return (
        <div className={styles.workSpaces}>
            {boards.map(board => (
                <BoardCover id={board.id} name={board.name} background={board.backgroundImage} />
            ))}
        </div>
    );
};

export default WorkSpaces;
