import { FC, useState } from 'react';
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
    const [listName, setListName] = useState(list.name);
    const [isEditing, setIsEditing] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        // Here you should call a function to update the list name in your store or backend
        // updateListName(list.id, newName);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };
    return (
        <div className={styles.listContainer}>
            <div className={styles.list}>
                <div className={styles.list__title}>
                    {isEditing ? (
                        <input
                            value={listName}
                            className={styles.list__title_input}
                            onChange={handleNameChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                        />
                    ) : (
                        <h2 onClick={() => setIsEditing(true)}>{listName}</h2>
                    )}
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
