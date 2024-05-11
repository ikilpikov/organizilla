import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteList } from '../services/workspace.service';
import { AxiosError } from 'axios';
import { IListDelete } from '../types/basicTypes';
const useDeleteList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (listData: IListDelete) => {
            const { id } = listData;
            return deleteList(id);
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
export default useDeleteList;
