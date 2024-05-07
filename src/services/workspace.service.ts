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
