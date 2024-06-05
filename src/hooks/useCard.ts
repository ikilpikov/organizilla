import { useQuery } from '@tanstack/react-query';
import { getCard } from 'services/workspace.service';

const useCard = (id: number) => {
    return useQuery({
        queryKey: ['card', id],
        queryFn: () => getCard(id),
        enabled: false,
    });
};
export default useCard;
