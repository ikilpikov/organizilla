import axios from 'axios';
import { axiosTrelloInstance } from './instances';
import { IBoard } from '../types/entityTypes';
import { filterTrelloData } from '../utils/filterTrelloData';

const TRELLO_API_KEY = import.meta.env.VITE_TRELLO_API_KEY;

export const getTrelloBoards = async (tokenValue: string) => {
    const response = await axios.get(
        `https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${tokenValue}`,
    );
    return response;
};

interface IGetSelectedData {
    tokenValue: string;
    boards: string[];
}
export const getSelectedData = async ({ tokenValue, boards }: IGetSelectedData) => {
    const listBoards: IBoard[] = [];

    boards.forEach(async board => {
        try {
            const [boardResponse, checkListsResponse, listsResponse, cardResponse] =
                await Promise.all([
                    axiosTrelloInstance.get(`${board}/`, {
                        params: { token: tokenValue },
                    }),
                    axiosTrelloInstance.get(`${board}/checklists`, {
                        params: { token: tokenValue },
                    }),
                    axiosTrelloInstance.get(`${board}/lists/`, {
                        params: { token: tokenValue },
                    }),
                    axiosTrelloInstance.get(`${board}/cards/`, {
                        params: { token: tokenValue },
                    }),
                ]);
            const boardObject: IBoard = filterTrelloData(
                boardResponse.data,
                checkListsResponse.data,
                listsResponse.data,
                cardResponse.data,
            );
            listBoards.push(boardObject);
        } catch (error) {
            console.log(error);
        }
    });
    console.log(listBoards);
};
