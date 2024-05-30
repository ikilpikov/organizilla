export interface IBoard {
    id: string;
    closed: boolean;
    lists: IList[];
    labelNames: ILabelName[];
    name: string;
    checkLists: ICheckList[];
    background: string;
}
export interface ILabelName {
    [key: string]: string;
}
export interface IList {
    id: number;
    cards: ICard[];
    color: string | null;
    closed: boolean;
    subscribed: boolean;
    name: string;
}
export interface ICard {
    id: number;
    listId: number;
    closed: boolean;
    lastActivity: Date;
    idCheckLists: number[];
    isTemplate: boolean;
    name: string;
    subscribed: boolean;
    labels: ILabel[];
    description: string;
    colors: string[];
}
export interface ILabel {
    color: string;
    name: string;
}
export interface ICheckList {
    name: string;
    checkItems: ICheckItem[];
    idCard: string[];
}
export interface ICheckItem {
    name: string;
    state: 'complete' | 'incomplete';
}

export interface IBackgroundImage {
    urls: IURL[];
}
export interface IURL {
    full: string;
    raw: string;
    regular: string;
    small: string;
    small_s3: string;
    thumb: string;
}
export interface IListReorder {
    id: number | null;
    previousListId: number | null;
    nextListId: number | null;
}
export interface ICardReorder {
    id: number | null;
    previousCardId: number | null;
    nextCardId: number | null;
    listId: number;
}
export interface IBoardQueryData {
    data: IBoard;
}
export interface IExtendedCard extends ICard {
    listName: string;
    boardName: string;
    boardId: string;
}
