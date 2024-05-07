import { IBoardPost } from '../types/basicTypes';
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
