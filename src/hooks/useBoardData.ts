import { useQuery } from '@tanstack/react-query';
import { getBoard } from 'services/workspace.service';

const useBoardData = (id: string) => {
    return useQuery({
        queryKey: ['board', id],
        queryFn: () => getBoard(id),
        refetchOnWindowFocus: false,
        retry: 0,
    });
};
export default useBoardData;
