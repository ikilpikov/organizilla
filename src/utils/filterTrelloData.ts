import { IBoard, ICheckList, IList, ICard, ICheckItem, ILabel } from '../types/entityTypes';
export const filterTrelloData = (
    board: IBoard,
    checkList: ICheckList[],
    list: IList[],
    cards: ICard[],
) => {
    const boardObject: IBoard = {
        id: '',
        closed: false,
        lists: [],
        labelNames: [],
        checkLists: [],
        name: '',
        background:
            'https://images.unsplash.com/photo-1508615039623-a25605d2b022?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTgwNjF8MHwxfHNlYXJjaHw3Mnx8cGhvdG8lMjBiYWNrZ3JvdW5kfGVufDB8MHx8fDE3MTY5MTg1NTJ8MA&ixlib=rb-4.0.3&q=85',
    };

    const checkLists: ICheckList[] = checkList.map((checkList: ICheckList) => ({
        name: checkList.name,
        idCard: checkList.idCard,
        checkItems: checkList.checkItems.map((checkItem: ICheckItem) => ({
            name: checkItem.name,
            state: checkItem.state,
        })),
    }));

    const lists = list.map((list: IList) => {
        const cardsInCurrentList = cards
            .filter((card: ICard) => card.idList === list.id)
            .map((filteredCard: ICard) => ({
                closed: filteredCard.closed,
                name: filteredCard.name,
                dateLastActivity: filteredCard.dateLastActivity,
                isTemplate: filteredCard.isTemplate,
                subscribed: filteredCard.subscribed,
                idCheckLists: filteredCard.idCheckLists,
                labels: filteredCard.labels.map((label: ILabel) => ({
                    color: label.color,
                    name: label.name,
                })),
                idList: filteredCard.idList,
            }));
        return {
            id: list.id,
            color: list.color,
            closed: list.closed,
            name: list.name,
            subscribed: list.subscribed,
            cards: cardsInCurrentList,
        };
    });

    const { id, name, closed, labelNames } = board;
    console.log(list);

    Object.assign(boardObject, { id, name, closed, labelNames, checkLists, lists });
    return boardObject;
};
