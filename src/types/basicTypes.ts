export interface IOptions {
    value: string;
    label: string;
}
export interface IBoardPost {
    name: string;
    backgroundImage: string;
    isPublic: boolean;
}
export interface IListPost {
    name: string;
    boardId: string;
}
export interface IListDelete {
    id: number;
    boardId: string;
}

export interface ISetColor {
    boardId: string;
    color: string;
    value: string;
}
export interface ISetCardColor {
    cardId: number;
    color: string;
}
type cardColorAction = 'set' | 'unset';

export interface ICardColorData extends ISetCardColor {
    action: cardColorAction;
    boardId: string;
}
