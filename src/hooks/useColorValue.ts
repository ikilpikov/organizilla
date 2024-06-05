import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { setColorValue } from 'services/workspace.service';
import { ISetColor } from 'types/basicTypes';

const useColorValue = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ISetColor) => setColorValue(data),
        onSuccess(response) {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ['colors'] });
        },
        onError: (error: AxiosError, variables) => {
            console.log(error);
            console.log(variables);
        },
    });
};

export default useColorValue;
