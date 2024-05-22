import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createList } from '../services/workspace.service';
import { IListPost } from '../types/basicTypes';
import { IBoardQueryData, IList } from '../types/entityTypes';
import { AxiosError } from 'axios';

const useList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (listData: IListPost) => createList(listData),
        onMutate: async (newListData: IListPost) => {
            const { boardId } = newListData;

            // Отменяем текущие запросы для данных доски
            await queryClient.cancelQueries({ queryKey: ['board', boardId] });

            // Сохраняем текущее состояние для возможного восстановления
            const previousBoardData = queryClient.getQueryData<IBoardQueryData>(['board', boardId]);

            // Оптимистически обновляем состояние
            if (previousBoardData) {
                queryClient.setQueryData<IBoardQueryData>(['board', boardId], oldData => {
                    if (!oldData) return oldData;

                    const newList: IList = {
                        id: Math.random(),
                        name: newListData.name,
                        cards: [],
                        color: null,
                        closed: false,
                        subscribed: false,
                    };

                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            lists: [...oldData.data.lists, newList],
                        },
                    };
                });
            }

            return { previousBoardData };
        },
        onSuccess: (_, variables) => {
            const id = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', id] });
        },
        onError: (error: AxiosError, variables, context) => {
            console.error('Error creating list:', error);

            // Восстанавливаем предыдущее состояние в случае ошибки
            if (context?.previousBoardData) {
                queryClient.setQueryData(['board', variables.boardId], context.previousBoardData);
            }
        },
        onSettled: (_, __, variables) => {
            const id = variables.boardId;
            queryClient.invalidateQueries({ queryKey: ['board', id] });
        },
    });
};

export default useList;
