import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { reorderCard } from 'services/workspace.service';
import { ICardReorder } from 'types/entityTypes';

const useReorderCard = () => {
    // const queryClient = useQueryClient();
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
export default useReorderCard;
