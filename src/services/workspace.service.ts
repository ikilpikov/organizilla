import { IBoardPost, IListPost } from '../types/basicTypes';
import { IListReorder } from '../types/entityTypes';
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
    const response = await axiosInstanceWithToken.patch(`/workspace/list/reorder/${id}`, {
        previousListId,
        nextListId,
    });
    return response;
};
