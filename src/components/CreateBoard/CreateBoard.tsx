import { useState } from 'react';
import useBoard from '../../hooks/useBoard';
import Select from 'react-select';
import SelectBackground from '../SelectBackground/SelectBackground';
import { useBackgroundImageStore } from '../../store';
import BoardView from '../BoardView/BoardView';
import styles from './CreateBoard.module.scss';

const CreateBoard = () => {
    const setBackgroundImagePageNumber = useBackgroundImageStore(
        state => state.setBackgroundImagePageNumber,
    );
    const selectedBackground = useBackgroundImageStore(state => state.selectedBackground);
    const options = [
        { value: true, label: 'Public' },
        { value: false, label: 'Private' },
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
    const handleSelectChange = (selectedOption: any) => {
        if (selectedOption) {
            setSelectedOption(selectedOption);
        }
    };
    return (
        <div className={styles.createBoard}>
            <div className={styles.createBoard__addData}>
                <h1>Create Board</h1>
                <label>Board name</label>
                <input value={name} onChange={event => setName(event.target.value)} />
                <Select options={options} value={selectedOption} onChange={handleSelectChange} />
                <h3>Select background</h3>
                <SelectBackground />
                <button onClick={() => setBackgroundImagePageNumber()}>more backgrounds</button>
            </div>
            <div className={styles.createBoard__boardView}>
                <BoardView background={selectedBackground.regular} />
                <button
                    className={styles.createBoard__boardView__create}
                    onClick={() => createBoard()}
                >
                    Create
                </button>
            </div>
        </div>
    );
};

export default CreateBoard;
