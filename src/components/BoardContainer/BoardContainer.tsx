import { useShowActionStore } from 'store';
import { FC, useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';
import useBoardData from 'hooks/useBoardData';
import useReorderCard from 'hooks/useReorderCard';
import useReorderList from 'hooks/useReorderList';
import CreateListButton from 'components/CreateList/CreateListButton/CreateListButton';
import List from 'components/List/List';
import { IList } from 'types/entityTypes';
import { reorderCard, reorderList } from 'utils/reorderHelpers';
import styles from './BoardContainer.module.scss';

interface IBoardContainerProps {
    id: string;
}

const BoardContainer: FC<IBoardContainerProps> = ({ id }) => {
    const [listData, setListData] = useState<IList[]>([]);
    const { data } = useBoardData(id || '');
    const { mutate } = useReorderList();
    const { mutate: mutateCard } = useReorderCard();
    const setShowListActions = useShowActionStore(state => state.setShowListActions);
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);

    useEffect(() => {
        if (data) {
            setListData(data.data.lists);
        }
    }, [data]);

    const handleDragDrop = (results: DropResult) => {
        const { source, destination, type, draggableId } = results;
        console.log(results);

        if (
            !destination ||
            (source.droppableId === destination.droppableId && source.index === destination.index)
        ) {
            return;
        }

        if (type === 'group') {
            reorderList(source, destination, draggableId, listData, setListData, mutate);
        } else if (type === 'card') {
            reorderCard(source, destination, draggableId, listData, setListData, mutateCard);
        }
    };

    const handleDragStart = () => {
        setShowListActions(-1);
        setShowAddCard(-1);
        setShowCardActions(-1);
    };

    return (
        <div className={styles.boardContainer}>
            <DragDropContext
                onDragEnd={event => handleDragDrop(event)}
                onDragStart={handleDragStart}
            >
                <div className={styles.lists}>
                    <Droppable droppableId="ROOT" type="group" direction="horizontal">
                        {provided => (
                            <div
                                className={styles.lists}
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {listData.map((list, index) => (
                                    <Draggable
                                        draggableId={list.id.toString()}
                                        index={index}
                                        key={list.id}
                                    >
                                        {provided => (
                                            <div
                                                {...provided.dragHandleProps}
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                            >
                                                <List
                                                    key={list.id}
                                                    list={list}
                                                    boardId={id}
                                                    setListData={setListData}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className={styles.addList}>
                        <CreateListButton />
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default BoardContainer;
