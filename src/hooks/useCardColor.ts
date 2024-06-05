import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setCardColor } from 'services/workspace.service';
import { removeCardColor } from 'services/workspace.service';
import { ICardColorData } from 'types/basicTypes';

const useCardColor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (cardColorData: ICardColorData) => {
            console.log(cardColorData);

            const { cardId, color } = cardColorData;
            if (cardColorData.action === 'set') return setCardColor({ cardId, color });
            else return removeCardColor({ cardId, color });
        },
        onSuccess: (response, variables) => {
            const id = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', id] });
            console.log(response);
        },
        onError: error => {
            console.log(error);
        },
    });
};
export default useCardColor;
