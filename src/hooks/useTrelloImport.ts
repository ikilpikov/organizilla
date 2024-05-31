import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { importTrelloBoard } from '../services/workspace.service';
import { IBoard } from '../types/entityTypes';
import { useImportModalVisibleStore } from '../store';

const useTrelloImport = () => {
    const navigator = useNavigate();
    const setImportModalIsVisible = useImportModalVisibleStore(
        state => state.setImportModalIsVisible,
    );
    return useMutation({
        mutationFn: (data: IBoard[]) => importTrelloBoard(data),
        onSuccess: (response, _) => {
            if (response.data == 'ok') {
                navigator('/');
                setImportModalIsVisible(false);
            }
        },
        onError: (error, variables) => {
            console.log(variables);

            console.log(error);
        },
    });
};
export default useTrelloImport;
