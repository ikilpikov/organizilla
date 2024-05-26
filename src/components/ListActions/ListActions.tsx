import { FC, useEffect, useRef, useState } from 'react';
import useDeleteList from '../../hooks/useDeleteList';
import useClickOutside from '../../hooks/useClickOutside';
import { useShowActionStore } from '../../store';
import cross from '../../assets/icons/cross.svg';
import styles from './ListActions.module.scss';
interface IListActions {
    id: number;
    boardId: string;
}
const ListActions: FC<IListActions> = ({ id, boardId }) => {
    const setShowListActions = useShowActionStore(state => state.setShowListActions);
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);
    const { mutate } = useDeleteList();
    const listActionRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => setIsOpen(true), []);
    useClickOutside(listActionRef, () => setShowListActions(-1), isOpen);
    const deleteList = () => {
        mutate({ id, boardId });
        setShowListActions(-1);
    };
    return (
        <div className={styles.listActions}>
            <div ref={listActionRef}>
                <div className={styles.listActions__title}>
                    <h3>Действия со списком</h3>
                    <img src={cross} width={20} onClick={() => setShowListActions(Number(id))} />
                </div>
                <div className={styles.listActions__actions}>
                    <button onClick={() => deleteList()}>Удалить список</button>
                    <button onClick={() => setShowAddCard(id)}>Добавить карточку</button>
                    <button>Подписаться</button>
                </div>
            </div>
        </div>
    );
};

export default ListActions;
