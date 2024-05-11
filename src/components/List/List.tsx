import { FC } from 'react';
import ListContainer from '../ListContainer/ListContainer';
import styles from './List.module.scss';
import { IList } from '../../types/entityTypes';
interface IListProps {
    list: IList;
}
const List: FC<IListProps> = ({ list }) => {
    return (
        <div className={styles.list}>
            <h2>{list.name}</h2>
            <ListContainer />
            <button>Add card</button>
        </div>
    );
};

export default List;
