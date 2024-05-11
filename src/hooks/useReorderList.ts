import { useMutation } from '@tanstack/react-query';
import { reorderList } from '../services/workspace.service';
import { IListReorder } from '../types/entityTypes';
import { AxiosError } from 'axios';
const useReorderList = () => {
    return useMutation({
        mutationFn: (listReorderData: IListReorder) => {
            const { id, nextListId, previousListId } = listReorderData;
            return reorderList({ id, nextListId, previousListId });
        },
        onSuccess: (response, variables) => {
            console.log(variables, 'SUCCESS');
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
    });
};
export default useReorderList;
