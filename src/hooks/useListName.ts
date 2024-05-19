import { useMutation } from '@tanstack/react-query';
import { renameList } from '../services/workspace.service';
import { IList } from '../types/entityTypes';
import { AxiosError } from 'axios';

const useListName = () => {
    return useMutation({
        mutationFn: (list: IList) => renameList(list),
    });
};
export default useListName;
