export interface IBoard {
    id: string;
    closed: boolean;
    lists: IList[];
    labelNames: ILabelName[];
    name: string;
    checkLists: ICheckList[];
}
interface ILabelName {
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
    idList: number;
    closed: boolean;
    dateLastActivity: Date;
    idCheckLists: number[];
    isTemplate: boolean;
    name: string;
    subscribed: boolean;
    labels: ILabel[];
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
    id: string;
    boardId: string;
    previousListId: number | null;
    nextListId: number | null;
}
