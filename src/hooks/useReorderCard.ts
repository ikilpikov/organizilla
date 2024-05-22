import { useMutation } from '@tanstack/react-query';
import { reorderCard } from '../services/workspace.service';
import { ICardReorder } from '../types/entityTypes';
import { AxiosError } from 'axios';

const useCardList = () => {
    return useMutation({
        mutationFn: (cardReorderData: ICardReorder) => reorderCard(cardReorderData),
        onSuccess: (response, variables) => {
            console.log(response);

            console.log(variables, 'SUCCESS');
        },
        onError: (error: AxiosError) => {
            console.log(error);
        },
    });
};
export default useCardList;
