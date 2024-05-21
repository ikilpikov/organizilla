import { IBoardPost, IListPost } from '../types/basicTypes';
import { ICard, IList, IListReorder } from '../types/entityTypes';
import { axiosInstanceWithToken } from './instances';

export const createBoard = async ({ name, backgroundImage, isPublic }: IBoardPost) => {
    const response = await axiosInstanceWithToken.post('/workspace/board/create', {
        name,
        backgroundImage,
        isPublic,
    });
    return response;
};
export const getAllBoards = async () => {
    const response = await axiosInstanceWithToken.get('/workspace/board/all');
    return response;
};
export const getBoard = async (id: string) => {
    const response = await axiosInstanceWithToken.get(`/workspace/board/${id}`);
    return response;
};

export const createList = async ({ name, boardId }: IListPost) => {
    const response = await axiosInstanceWithToken.post('/workspace/list/create', { name, boardId });
    return response;
};

export const deleteList = async (id: string) => {
    const response = await axiosInstanceWithToken.delete(`/workspace/list/delete/${id}`);
    return response;
};
export const reorderList = async ({ id, previousListId, nextListId }: IListReorder) => {
    console.log('REORDER LIST');
    const response = await axiosInstanceWithToken.patch(`/workspace/list/reorder/${id}`, {
        previousListId,
        nextListId,
    });
    return response;
};
export const renameList = async ({ id, name }: Pick<IList, 'id' | 'name'>) => {
    const response = await axiosInstanceWithToken.patch(`/workspace/list/rename/${id}`, {
        name,
    });
    return response;
};

export const addCard = async ({ listId, name }: Pick<ICard, 'listId' | 'name'>) => {
    const response = await axiosInstanceWithToken.post(`/workspace/card/create`, {
        listId,
        name,
    });
    return response;
};

export const deleteCard = async (id: string) => {
    const response = await axiosInstanceWithToken.delete(`/workspace/card/delete/${id}`);
    return response;
};
