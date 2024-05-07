import { useQuery } from '@tanstack/react-query';
import { getBackgroundImages } from '../services/unsplashAPI.service';

const useBackgroundImages = (pageNumber: number) => {
    return useQuery({
        queryKey: ['background-images', pageNumber],
        queryFn: () => getBackgroundImages(pageNumber),
        refetchOnWindowFocus: false,
    });
};
export default useBackgroundImages;
