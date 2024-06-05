import { useMutation } from '@tanstack/react-query';
import { renameList } from 'services/workspace.service';
import { IList } from 'types/entityTypes';

const useListName = () => {
    return useMutation({
        mutationFn: (list: Pick<IList, 'id' | 'name'>) => renameList(list),
        onSuccess: (response, variables) => {
            console.log(response);

            console.log(variables, 'SUCCESS');
        },
        onError: error => {
            console.log(error);
        },
    });
};
export default useListName;
