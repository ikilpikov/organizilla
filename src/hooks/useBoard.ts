import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createBoard } from '../services/workspace.service';
import { IBoardPost } from '../types/basicTypes';
const useBoard = () => {
    return useMutation({
        mutationFn: (boardData: IBoardPost) => createBoard(boardData),
        onSuccess: response => {
            console.log(response);
        },
        onError: (error: AxiosError) => {
            console.log(localStorage.getItem('token'));
            console.log('уааа');

            console.log(error);
        },
    });
};
export default useBoard;
