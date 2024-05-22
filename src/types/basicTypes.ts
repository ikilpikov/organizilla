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
    name: number;
    boardId: string;
}
export interface IListDelete {
    id: number;
    boardId: string;
}
