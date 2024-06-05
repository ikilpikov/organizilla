import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { reorderList } from 'services/workspace.service';
import { IListReorder } from 'types/entityTypes';

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
