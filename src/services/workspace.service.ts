import {
    IBoardPost,
    IListPost,
    ISetCardColor,
    ISetColor,
    ISetDescription,
} from '../types/basicTypes';
import { ICard, IList, IListReorder, ICardReorder } from '../types/entityTypes';
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

export const deleteList = async (id: number) => {
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

export const renameCard = async ({ id, name }: Pick<ICard, 'id' | 'name'>) => {
    const response = await axiosInstanceWithToken.patch(`/workspace/card/${id}/rename`, {
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

export const deleteCard = async (id: number) => {
    const response = await axiosInstanceWithToken.delete(`/workspace/card/delete/${id}`);
    return response;
};

export const reorderCard = async ({ id, previousCardId, nextCardId, listId }: ICardReorder) => {
    const response = await axiosInstanceWithToken.patch(`/workspace/card/reorder/${id}`, {
        previousCardId,
        nextCardId,
        listId,
    });
    return response;
};

export const getAllColors = async (id: string) => {
    const response = await axiosInstanceWithToken.get(`/workspace/board/${id}/color/all`);
    return response;
};

export const setColorValue = async ({ boardId, color, value }: ISetColor) => {
    const colorValue = color === '' ? null : color;

    const response = await axiosInstanceWithToken.patch(`workspace/board/${boardId}/color`, {
        color: colorValue,
        value,
    });
    return response;
};

export const setCardColor = async ({ cardId, color }: ISetCardColor) => {
    const response = await axiosInstanceWithToken.patch(`workspace/card/${cardId}/color`, {
        color,
    });
    return response;
};

export const removeCardColor = async ({ cardId, color }: ISetCardColor) => {
    const response = await axiosInstanceWithToken.delete(`workspace/card/${cardId}/color`, {
        data: { color },
    });
    return response;
};

export const getCard = async (id: number) => {
    const response = await axiosInstanceWithToken.get(`/workspace/card/${id}`);
    return response;
};

export const getUserData = async () => {
    const response = await axiosInstanceWithToken.get('/account/user');
    return response;
};

export const setDescription = async ({ cardId, description }: ISetDescription) => {
    const response = await axiosInstanceWithToken.patch(`/workspace/card/${cardId}/description`, {
        description,
    });
    return response;
};
