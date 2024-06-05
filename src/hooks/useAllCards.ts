import { useQuery } from '@tanstack/react-query';
import { getAllBoards, getBoard } from 'services/workspace.service';
import { IBoard, IExtendedCard, IList } from 'types/entityTypes';

const useAllCards = () => {
    return useQuery({
        queryKey: ['allCards'],
        queryFn: async () => {
            console.log('петя');

            const boardsResponse = await getAllBoards();
            const boardsData = boardsResponse.data;

            const cardsPromises = boardsData.map(async (board: IBoard) => {
                try {
                    const boardResponse = await getBoard(board.id);
                    const lists = boardResponse.data.lists;
                    return lists.reduce((acc: IExtendedCard[], list: IList) => {
                        // Замените {} на []
                        const cardsWithInfo = list.cards.map(card => ({
                            ...card,
                            listName: list.name,
                            boardName: board.name,
                            boardId: board.id,
                        }));
                        return [...acc, ...cardsWithInfo];
                    }, []);
                } catch (error) {
                    console.error(`Error fetching lists for board ${board.id}:`, error);
                    return [];
                }
            });

            const cardsArrays = await Promise.all(cardsPromises);
            const allCards = cardsArrays.flat();
            console.log(allCards);

            return allCards;
        },
    });
};

export default useAllCards;
