import { useQuery } from '@tanstack/react-query';
import { getAllBoards } from 'services/workspace.service';

const useAllBoards = () => {
    return useQuery({
        queryKey: ['boards'],
        queryFn: () => getAllBoards(),
        refetchOnWindowFocus: false,
    });
};
export default useAllBoards;
