import { useQuery } from '@tanstack/react-query';
import { getAllColors } from '../services/workspace.service';

const useColors = (id: string) => {
    return useQuery({
        queryKey: ['colors'],
        queryFn: () => getAllColors(id),
        refetchOnWindowFocus: false,
    });
};
export default useColors;
