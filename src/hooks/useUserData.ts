import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../services/workspace.service';

const useUserData = () => {
    return useQuery({
        queryKey: ['user_data'],
        queryFn: () => getUserData(),
        refetchOnWindowFocus: false,
    });
};

export default useUserData;
