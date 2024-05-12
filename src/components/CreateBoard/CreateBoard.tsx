import { useState, useEffect } from 'react';
import useBoard from '../../hooks/useBoard';
import Select from 'react-select';
import SelectBackground from '../SelectBackground/SelectBackground';
import { useBackgroundImageStore } from '../../store';
import BoardView from '../BoardView/BoardView';
import styles from './CreateBoard.module.scss';
import ArrowBack from '../UI/ArrowBack/ArrowBack';
import { useTranslation } from 'react-i18next';

const CreateBoard = () => {
    const { t } = useTranslation();
    const setBackgroundImagePageNumber = useBackgroundImageStore(
        state => state.setBackgroundImagePageNumber,
    );
    const selectedBackground = useBackgroundImageStore(state => state.selectedBackground);
    const resetSelectedBackground = useBackgroundImageStore(state => state.resetSelectedBackground);
    const options = [
        { value: true, label: t('createBlankBoard.options.public') },
        { value: false, label: t('createBlankBoard.options.private') },
    ];
    const { mutate } = useBoard();
    const [name, setName] = useState('');
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const createBoard = () => {
        const boardData = {
            name,
            backgroundImage: selectedBackground.full,
            isPublic: selectedOption.value,
        };
        mutate(boardData);
    };
    useEffect(() => {
        setBackgroundImagePageNumber(true);
        resetSelectedBackground();
    }, [setBackgroundImagePageNumber, resetSelectedBackground]);
    const handleSelectChange = (selectedOption: any) => {
        if (selectedOption) {
            setSelectedOption(selectedOption);
        }
    };
    return (
        <div className={styles.createBoard}>
            <div className={styles.createBoard__addData}>
                <ArrowBack />
                <h1 className={styles.createBoard__addData}>{t('createBlankBoard.title')}</h1>
                <label>{t('createBlankBoard.boardName')}</label>
                <input
                    value={name}
                    onChange={event => setName(event.target.value)}
                    placeholder={t('createBlankBoard.boardNamePlaceholder')}
                />
                <Select
                    options={options}
                    value={selectedOption}
                    onChange={handleSelectChange}
                    className={styles.customSelect}
                />
                <h3 className={styles.createBoard__selectBackground}>
                    {t('createBlankBoard.selectBackground')}
                </h3>
                <SelectBackground />
                <button
                    onClick={() => setBackgroundImagePageNumber()}
                    className={styles.createBoard__selectBackground__more}
                >
                    {t('createBlankBoard.moreBackgrounds')}
                </button>
            </div>
            <div className={styles.createBoard__boardView}>
                <BoardView background={selectedBackground.regular} />
                <button
                    disabled={!name}
                    className={styles.createBoard__boardView__create}
                    onClick={() => createBoard()}
                >
                    {t('createBlankBoard.create')}
                </button>
            </div>
        </div>
    );
};

export default CreateBoard;
