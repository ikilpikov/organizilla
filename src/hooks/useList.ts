import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createList } from '../services/workspace.service';
import { IListPost } from '../types/basicTypes';
import { AxiosError } from 'axios';
const useList = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (listData: IListPost) => createList(listData),
        onSuccess: (response, variables) => {
            const id = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', id] });
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
    });
};
export default useList;
