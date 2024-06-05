import { FC, useEffect, useState } from 'react';
import useListName from '../../hooks/useListName';
import ListContainer from '../ListContainer/ListContainer';
import ListActions from '../ListActions/ListActions';
import CreateCardButton from '../CreateCard/CreateCardButton.tsx/CreateCardButton';
import { IList } from '../../types/entityTypes';
import { useShowActionStore } from '../../store';
import more from '../../assets/icons/more.svg';
import styles from './List.module.scss';

interface IListProps {
    list: IList;
    boardId: string;
    setListData: (list: IList[]) => void;
}

const List: FC<IListProps> = ({ list, boardId, setListData }) => {
    const showListActions = useShowActionStore(state => state.showListActions);
    const setShowListActions = useShowActionStore(state => state.setShowListActions);
    const [listName, setListName] = useState(list.name);
    const [isEditing, setIsEditing] = useState(false);
    const [rows, setRows] = useState(1);
    const { mutate } = useListName();

    useEffect(() => {
        const numLines = Math.min(Math.ceil(listName.length / 18), 10);
        setRows(numLines);
    }, [listName]);

    const handleNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setListName(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        mutate({ id: list.id, name: listName });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };
    return (
        <div className={styles.listContainer}>
            <div className={styles.list}>
                <div className={styles.list__title}>
                    {isEditing ? (
                        <textarea
                            value={listName}
                            className={styles.list__title_input}
                            onChange={handleNameChange}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            wrap="soft"
                            rows={rows}
                        />
                    ) : (
                        <>
                            <h2 onClick={() => setIsEditing(true)}>{listName}</h2>
                        </>
                    )}
                    <img src={more} width={20} onClick={() => setShowListActions(list.id)} />
                </div>
                <ListContainer cards={list.cards} listId={list.id.toString()} />
                <CreateCardButton listId={list.id} boardId={boardId} />
            </div>
            {showListActions === list.id && (
                <ListActions
                    list={list}
                    id={list.id}
                    boardId={boardId}
                    cards={list.cards}
                    setListData={setListData}
                />
            )}
        </div>
    );
};

export default List;
