import { FC } from 'react';
import cross from '../../assets/icons/cross.svg';
import styles from './ListActions.module.scss';
import useDeleteList from '../../hooks/useDeleteList';
import { useShowActionStore } from '../../store';
interface IListActions {
    id: number;
    boardId: string;
}
const ListActions: FC<IListActions> = ({ id, boardId }) => {
    const setShowListActions = useShowActionStore(state => state.setShowListActions);
    const { mutate } = useDeleteList();
    const deleteList = () => {
        mutate({ id, boardId });
        setShowListActions(-1);
    };
    return (
        <div className={styles.listActions}>
            <div className={styles.listActions__title}>
                <h3>Действия со списком</h3>
                <img src={cross} width={20} onClick={() => setShowListActions(Number(id))} />
            </div>
            <div className={styles.listActions__actions}>
                <button onClick={() => deleteList()}>Удалить список</button>
                <button>Добавить карточку</button>
                <button>Подписаться</button>
            </div>
        </div>
    );
};

export default ListActions;
