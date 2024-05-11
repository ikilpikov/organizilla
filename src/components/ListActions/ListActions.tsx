import { FC } from 'react';
import styles from './ListActions.module.scss';
import useDeleteList from '../../hooks/useDeleteList';
interface IListActions {
    id: string;
    boardId: string;
}
const ListActions: FC<IListActions> = ({ id, boardId }) => {
    const { mutate } = useDeleteList();
    const deleteList = () => {
        mutate({ id, boardId });
    };
    return (
        <div className={styles.listActions}>
            <h3>Действия со списком</h3>
            <button onClick={() => deleteList()}>Удалить список</button>
            <button>Добавить карточку</button>
            <button>Подписаться</button>
        </div>
    );
};

export default ListActions;
