import { useState, useEffect, FC } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useBoardData from '../../hooks/useBoardData';
import useReorderList from '../../hooks/useReorderList';
import { useShowActionStore } from '../../store';
import CreateListButton from '../CreateList/CreateListButton/CreateListButton';
import List from '../List/List';
import { IListReorder, IList, ICardReorder } from '../../types/entityTypes';
import styles from './BoardContainer.module.scss';
import useReorderCard from '../../hooks/useReorderCard';

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
        } else if (type === 'card') {
            const itemSourceIndex = source.index;
            const itemDestinationIndex = destination.index;

            const listSourceIndex = listData.findIndex(store => store.id == source.droppableId);
            const listDestinationIndex = listData.findIndex(
                store => store.id == destination.droppableId,
            );

            const newSourceItems = [...listData[listSourceIndex].cards];
            const newDestinationItems =
                source.droppableId != destination.droppableId
                    ? [...listData[listDestinationIndex].cards]
                    : newSourceItems;

            const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
            newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

            const newLists = [...listData];

            newLists[listSourceIndex] = {
                ...listData[listSourceIndex],
                cards: newSourceItems,
            };
            newLists[listDestinationIndex] = {
                ...listData[listDestinationIndex],
                cards: newDestinationItems,
            };
            const cardReorder: ICardReorder = {
                id: draggableId,
                previousCardId: null,
                nextCardId: null,
                listId: destination.droppableId,
            };

            const [selectedList] = listData.filter(state => state.id == destination.droppableId);

            const previousCardId =
                itemDestinationIndex > 0 ? selectedList?.cards[itemDestinationIndex - 1]?.id : null;
            const nextListId =
                itemDestinationIndex < newLists.length - 1
                    ? selectedList?.cards[itemDestinationIndex]?.id
                    : null;
            cardReorder.previousCardId = previousCardId;
            cardReorder.nextCardId = nextListId;
            setListData(newLists);
            mutateCard(cardReorder);
        }
    };

    const handleDragStart = () => {
        setShowListActions(-1);
        setShowAddCard(-1);
        setShowCardActions(-1);
    };
    return (
        <div className={styles.boardContainer}>
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
