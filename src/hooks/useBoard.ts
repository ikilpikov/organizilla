import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { createBoard } from 'services/workspace.service';
import { IBoardPost } from 'types/basicTypes';

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
