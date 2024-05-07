import { useEffect, useState } from 'react';
import useTrelloBoards from '../../../hooks/useTrelloBoards';
import { IBoard } from '../../../types/entityTypes';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';
import ImportDataModal from '../../UI/Modals/ImportData/ImportDataModal';
import { getSelectedData } from '../../../services/trelloAPI.service';
import { useImportModalVisibleStore } from '../../../store';
import styles from './TrelloImport.module.scss';
const TrelloImport = () => {
    const [tokenValue, setTokenValue] = useState('');
    const [boardsData, setBoardsData] = useState<IBoard[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { importModalIsVisible, setImportModalIsVisible } = useImportModalVisibleStore();
    const { data, refetch, isError } = useTrelloBoards(tokenValue);

    const options = boardsData?.map((element: IBoard) => ({
        value: element.id,
        label: element.name,
    }));

    const getAllBoards = () => {
        tokenValue !== '' && refetch();
    };

    useEffect(() => {
        if (data) {
            setBoardsData(
                data.data.map((item: IBoard) => {
                    return { id: item.id, name: item.name };
                }),
            );
        }
    }, [data]);

    const importData = () => {
        setImportModalIsVisible(true);
        getSelectedData({ tokenValue, boards: selectedOptions });
    };

    return (
        <div>
            <input
                placeholder="Введите токен"
                onBlur={getAllBoards}
                value={tokenValue}
                onChange={event => setTokenValue(event.target.value)}
                className={styles.trelloImport__token}
            />
            {isError && <p>Неверный токен</p>}
            <h3>Шаг 2. Выбор досок для импорта</h3>
            <CustomSelect
                options={tokenValue ? options : []}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
            <button onClick={importData} disabled={!(selectedOptions.length > 0)}>
                Импортировать данные
            </button>
            {importModalIsVisible && <ImportDataModal />}
        </div>
    );
};

export default TrelloImport;
