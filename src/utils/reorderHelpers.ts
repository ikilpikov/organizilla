import { Dispatch, SetStateAction } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { ICardReorder, IList, IListReorder } from '../types/entityTypes';

export const reorderList = (
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
    listData: IList[],
    setListData: Dispatch<SetStateAction<IList[]>>,
    mutateList: (arg: IListReorder) => void,
) => {
    const listReorder: IListReorder = {
        id: draggableId,
        previousListId: null,
        nextListId: null,
    };

    const reorderedLists = [...listData];
    const [removedList] = reorderedLists.splice(source.index, 1);
    reorderedLists.splice(destination.index, 0, removedList);

    listReorder.previousListId =
        destination.index > 0 ? reorderedLists[destination.index - 1].id : null;
    listReorder.nextListId =
        destination.index < reorderedLists.length - 1
            ? reorderedLists[destination.index + 1].id
            : null;

    setListData(reorderedLists);
    mutateList(listReorder);
};

export const reorderCard = (
    source: DraggableLocation,
    destination: DraggableLocation,
    draggableId: string,
    listData: IList[],
    setListData: Dispatch<SetStateAction<IList[]>>,
    mutateCard: (arg: ICardReorder) => void,
) => {
    const sourceListIndex = listData.findIndex(list => list.id.toString() === source.droppableId);
    const destinationListIndex = listData.findIndex(
        list => list.id.toString() === destination.droppableId,
    );

    const newSourceCards = [...listData[sourceListIndex].cards];
    const newDestinationCards =
        source.droppableId !== destination.droppableId
            ? [...listData[destinationListIndex].cards]
            : newSourceCards;

    const [movedCard] = newSourceCards.splice(source.index, 1);
    newDestinationCards.splice(destination.index, 0, movedCard);

    const newLists = [...listData];
    newLists[sourceListIndex] = { ...listData[sourceListIndex], cards: newSourceCards };
    newLists[destinationListIndex] = {
        ...listData[destinationListIndex],
        cards: newDestinationCards,
    };

    const cardReorder: ICardReorder = {
        id: draggableId,
        previousCardId:
            destination.index > 0 ? newDestinationCards[destination.index - 1].id : null,
        nextCardId:
            destination.index < newDestinationCards.length - 1
                ? newDestinationCards[destination.index + 1].id
                : null,
        listId: destination.droppableId,
    };

    setListData(newLists);
    mutateCard(cardReorder);
};
