import { useQuery } from '@tanstack/react-query';
import { getTrelloBoards } from 'services/trelloAPI.service';

const useTrelloBoards = (tokenValue: string) => {
    return useQuery({
        queryKey: ['trello-boards'],
        queryFn: () => getTrelloBoards(tokenValue),
        enabled: false,
        retry: 1,
    });
};
export default useTrelloBoards;
