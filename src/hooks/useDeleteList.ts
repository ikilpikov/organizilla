import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { deleteList } from 'services/workspace.service';
import { IBoardQueryData } from 'types/entityTypes';
import { IListDelete } from '../types/basicTypes';

const useDeleteList = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (listData: IListDelete) => {
            const { id } = listData;
            return deleteList(id);
        },
        onMutate: async (listData: IListDelete) => {
            const { id, boardId } = listData;

            // Отменяем текущие запросы для данных доски
            await queryClient.cancelQueries({ queryKey: ['board', boardId] });

            // Сохраняем текущее состояние для возможного восстановления
            const previousBoardData = queryClient.getQueryData<IBoardQueryData>(['board', boardId]);

            // Оптимистически обновляем состояние
            if (previousBoardData) {
                queryClient.setQueryData<IBoardQueryData>(['board', boardId], oldData => {
                    if (!oldData) return oldData;
                    const newLists = oldData.data.lists.filter(list => list.id !== id);
                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            lists: newLists,
                        },
                    };
                });
            }

            return { previousBoardData };
        },
        onError: (error: AxiosError, variables, context) => {
            console.error('Error deleting list:', error);

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

export default useDeleteList;
