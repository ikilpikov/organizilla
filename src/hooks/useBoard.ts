import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createBoard } from '../services/workspace.service';
import { IBoardPost } from '../types/basicTypes';
import { useNavigate } from 'react-router-dom';
const useBoard = () => {
    const navigator = useNavigate();
    return useMutation({
        mutationFn: (boardData: IBoardPost) => createBoard(boardData),
        onSuccess: response => {
            console.log(response.data);
            navigator(`/board/${response.data.boardId}`);
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
    });
};
export default useBoard;
