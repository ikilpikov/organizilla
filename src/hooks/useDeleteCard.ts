import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCard } from '../services/workspace.service';
import { AxiosError } from 'axios';
import { IListDelete } from '../types/basicTypes';
const useDeleteCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (listData: IListDelete) => {
            const { id } = listData;
            return deleteCard(id);
        },
        onSuccess: (_, variables) => {
            const id = variables.boardId;
            console.log(id);

            queryClient.invalidateQueries({ queryKey: ['board', id] });
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
    });
};
export default useDeleteCard;
