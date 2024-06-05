import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { addCard } from 'services/workspace.service';

interface ICardPost {
    name: string;
    listId: number;
    boardId: string;
}
const useAddCard = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: ICardPost) => {
            const { listId, name } = data;
            return addCard({ listId, name });
        },
        onSuccess: (response, variables) => {
            console.log(response);

            const id = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', id] });
        },
        onError: (error: AxiosError, variables) => {
            console.log(error);
            console.log(variables);
        },
    });
};
export default useAddCard;
