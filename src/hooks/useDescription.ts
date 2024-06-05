import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { setDescription } from 'services/workspace.service';
import { ISetDescription } from 'types/basicTypes';

const useDescription = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ISetDescription) => setDescription(data),
        onSuccess(response, variables) {
            console.log(response);

            const id = variables.cardId;
            queryClient.invalidateQueries({ queryKey: ['card', id] });
        },
        onError(error: AxiosError) {
            console.log(error);
        },
    });
};
export default useDescription;
