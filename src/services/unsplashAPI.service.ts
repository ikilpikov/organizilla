import axios from 'axios';
const clientID = import.meta.env.VITE_UNSPLASH_API_KEY;
export const getBackgroundImages = async (pageNumber: number) => {
    console.log('aaaaa');

    const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${pageNumber}&query=photo background&orientation=landscape&client_id=${clientID}`,
    );
    console.log(response);

    return response;
};
