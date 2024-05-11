import { FC } from 'react';
import ListContainer from '../ListContainer/ListContainer';
import styles from './List.module.scss';
import { IList } from '../../types/entityTypes';
import more from '../../assets/icons/more.svg';
import ListActions from '../ListActions/ListActions';
import { useShowListActionStore } from '../../store';
interface IListProps {
    list: IList;
    boardId: string;
}

const List: FC<IListProps> = ({ list, boardId }) => {
    const { showListActions, setShowListActions } = useShowListActionStore();
    return (
        <div className={styles.listContainer}>
            <div className={styles.list}>
                <div className={styles.list__title}>
                    <h2>{list.name}</h2>
                    <h5>{list.id}</h5>
                    <img src={more} width={20} onClick={() => setShowListActions(list.id)} />
                </div>
                <ListContainer />
                <button>Add card</button>
            </div>
            {showListActions === list.id && (
                <ListActions id={list.id.toString()} boardId={boardId} />
            )}
        </div>
    );
};

export default List;
