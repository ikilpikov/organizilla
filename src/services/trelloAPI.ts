import axios from "axios";
import { ITrelloBoard } from "../types/trelloBoardTypes";
const TRELLO_API_KEY = import.meta.env.VITE_TRELLO_API_KEY;

export const getTrelloBoards = async (tokenValue: string) => {
  const response = await axios.get(
    `https://api.trello.com/1/members/me/boards?key=${TRELLO_API_KEY}&token=${tokenValue}`
  );
  return response;
};

interface IGetSelectedData {
  tokenValue: string;
  boards: string[];
}
export const getSelectedData = async ({
  tokenValue,
  boards,
}: IGetSelectedData) => {
  const listBoards = [];
  boards.forEach(async (board) => {
    const boardObj = {};
    try {
      const boardResponse = await axios.get(
        `https://api.trello.com/1/boards/${board}/?key=${TRELLO_API_KEY}&token=${tokenValue}`
      );
      const { id, name } = boardResponse.data;
      boardObj.id = id;
      boardObj.name = name;
    } catch (error) {
      console.log(error);
    }
    try {
      const listsResponse = await axios.get(
        `https://api.trello.com/1/boards/${board}/lists/?key=${TRELLO_API_KEY}&token=${tokenValue}`
      );
      boardObj.lists = listsResponse.data;
    } catch {
      console.log("error");
    }

    try {
      const cardResponse = await axios.get(
        `https://api.trello.com/1/boards/${board}/cards/?key=${TRELLO_API_KEY}&token=${tokenValue}`
      );
      boardObj.lists.forEach((list: any) => {
        // Фильтруем карточки, чтобы оставить только те, которые принадлежат текущему списку
        const cardsForList = cardResponse.data.filter(
          (card: any) => card.idList === list.id
        );
        // Добавляем карточки в свойство cards текущего списка
        list.cards = cardsForList;
      });
    } catch {
      console.log("error");
    }

    listBoards.push(boardObj);
  });
  console.log(listBoards);
};
