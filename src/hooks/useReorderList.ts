import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reorderList } from '../services/workspace.service';
import { IListReorder } from '../types/entityTypes';
import { AxiosError } from 'axios';
const useReorderList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (listReorderData: IListReorder) => {
            const { id, nextListId, previousListId } = listReorderData;
            return reorderList({ id, nextListId, previousListId });
        },
        onSuccess: (response, variables) => {
            console.log(response);
            const boardId = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', boardId] });
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
    });
};
export default useReorderList;
