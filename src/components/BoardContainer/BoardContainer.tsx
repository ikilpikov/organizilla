import { useState, useEffect, FC } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useBoardData from '../../hooks/useBoardData';
import useReorderList from '../../hooks/useReorderList';
import { useShowListActionStore } from '../../store';
import CreateListButton from '../CreateList/CreateListButton/CreateListButton';
import List from '../List/List';
import { IListReorder, IList } from '../../types/entityTypes';
import styles from './BoardContainer.module.scss';

interface IBoardContainerProps {
    id: string;
}
const BoardContainer: FC<IBoardContainerProps> = ({ id }) => {
    const [listData, setListData] = useState<IList[]>([]);
    const { data } = useBoardData(id || '');
    const { mutate } = useReorderList();
    const setShowListActions = useShowListActionStore(state => state.setShowListActions);
    useEffect(() => {
        if (data) {
            setListData(data.data.lists);
        }
    }, [data]);
    const handleDragDrop = results => {
        const { source, destination, type, draggableId } = results;

        if (!destination) return;
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return;
        if (type === 'group') {
            const listReorder: IListReorder = {
                id: draggableId,
                previousListId: null,
                nextListId: null,
            };
            const reorderedLists = [...listData];
            const sourceIndex = source.index;
            const destinationIndex = destination.index;
            const [removedList] = reorderedLists.splice(sourceIndex, 1);
            reorderedLists.splice(destinationIndex, 0, removedList);

            const previousListId =
                destinationIndex > 0 ? reorderedLists[destinationIndex - 1].id : null;
            const nextListId =
                destinationIndex < reorderedLists.length - 1
                    ? reorderedLists[destinationIndex + 1].id
                    : null;

            listReorder.previousListId = previousListId;
            listReorder.nextListId = nextListId;

            setListData(reorderedLists);
            mutate(listReorder);
        }
    };

    const handleDragStart = () => {
        setShowListActions(-1);
    };
    return (
        <div>
            <DragDropContext onDragEnd={handleDragDrop} onDragStart={handleDragStart}>
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
                                                <List key={list.id} list={list} boardId={id} />
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
