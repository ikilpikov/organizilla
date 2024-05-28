import { useMutation, useQueryClient } from '@tanstack/react-query';
import { renameCard } from '../services/workspace.service';
import { ISetCardName } from '../types/basicTypes';

const useCardName = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (card: ISetCardName) => {
            const { cardId, name } = card;
            return renameCard({ id: cardId, name });
        },
        onSuccess: (response, variables) => {
            console.log(response);

            const id = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', id] });
        },
        onError: error => {
            console.log(error);
        },
    });
};
export default useCardName;
