import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTrelloBoards from '../../../hooks/useTrelloBoards';
import useTrelloImport from '../../../hooks/useTrelloImport';
import CustomSelect from '../../UI/CustomSelect/CustomSelect';
import ImportDataModal from '../../UI/Modals/ImportData/ImportDataModal';
import ErrorMessage from '../../UI/ErrorMessage/ErrorMessage';
import { getSelectedData } from '../../../services/trelloAPI.service';
import { useImportModalVisibleStore } from '../../../store';
import { IBoard } from '../../../types/entityTypes';
import styles from '../Trello.module.scss';
const TrelloImport = () => {
    const { t } = useTranslation();
    const [tokenValue, setTokenValue] = useState('');
    const [boardsData, setBoardsData] = useState<IBoard[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { importModalIsVisible, setImportModalIsVisible } = useImportModalVisibleStore();
    const { data, refetch, isError } = useTrelloBoards(tokenValue);
    const { mutate } = useTrelloImport();
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

    const importData = async () => {
        setImportModalIsVisible(true);
        const trelloBoards = await getSelectedData({ tokenValue, boards: selectedOptions });
        mutate(trelloBoards);
    };

    return (
        <div className={styles.trelloImport}>
            <input
                placeholder={t('import.inputToken')}
                onBlur={getAllBoards}
                value={tokenValue}
                onChange={event => setTokenValue(event.target.value)}
                className={styles.trelloImport__token}
            />
            {isError && <ErrorMessage message={t('import.invalidToken')} />}
            <h3>{t('import.step2')}</h3>
            <CustomSelect
                options={tokenValue ? options : []}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
            />
            <button
                onClick={importData}
                disabled={!(selectedOptions.length > 0)}
                className={styles.trelloImport__btn}
            >
                {t('import.importData')}
            </button>
            {importModalIsVisible && <ImportDataModal />}
        </div>
    );
};

export default TrelloImport;
