import { ISortBoards } from 'types/entityTypes';

const sortBoardsByActivity = (boards: ISortBoards[]): ISortBoards[] => {
    return boards.sort(
        (a, b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime(),
    );
};

// Функция для сортировки досок по имени
export const sortBoardsByName = (boards: ISortBoards[]): ISortBoards[] => {
    return boards.sort((a, b) => a.name.localeCompare(b.name));
};

// Функция для фильтрации досок, показывая только последние
export const getRecentBoards = (boards: ISortBoards[]): ISortBoards[] => {
    return sortBoardsByActivity(boards).slice(0, 4);
};
