import { useState } from 'react';
import useAllBoards from '../../hooks/useAllBoards';
import useBoardData from '../../hooks/useBoardData';
import { IBoard, ICard, IList } from '../../types/entityTypes';
import PomodoroCards from '../PomodoroCards/PomodoroCards';
import styles from './SelectCard.module.scss';

const SelectCard = () => {
    const [selectedBoard, setSelectedBoard] = useState('');
    const { data, isSuccess } = useAllBoards();
    const { data: dataBoard, isSuccess: isDataBoardSuccess } = useBoardData(selectedBoard);
    const [listIndex, setListIndex] = useState(-1);
    const [cards, setCards] = useState<{ name: string; complete: boolean }[]>([]);

    const selectCard = (name: string) => {
        if (name !== '' && !cards.some(card => card.name === name)) {
            setCards([{ name, complete: false }, ...cards]);
        }
    };

    return (
        <div className={styles.selectCard}>
            {isSuccess && (
                <>
                    <div>
                        <h3>Выберите доску</h3>
                        <select
                            onChange={event => setSelectedBoard(event.target.value)}
                            value={selectedBoard}
                        >
                            <option value="">Выберите доску</option>
                            {data?.data.map((board: IBoard) => (
                                <option key={board.id} value={board.id}>
                                    {board.name}
                                </option>
                            ))}
                        </select>
                        {isDataBoardSuccess && (
                            <div>
                                {dataBoard?.data.lists.length > 0 ? (
                                    <div>
                                        <h3>Выберите список</h3>
                                        <select
                                            onChange={event =>
                                                setListIndex(Number(event.target.value))
                                            }
                                            value={listIndex}
                                        >
                                            <option value={-1}>Выберите список</option>
                                            {dataBoard?.data.lists.map(
                                                (list: IList, index: number) => (
                                                    <option key={list.id} value={index}>
                                                        {list.name}
                                                    </option>
                                                ),
                                            )}
                                        </select>
                                    </div>
                                ) : (
                                    <p>Не содержит списков</p>
                                )}
                            </div>
                        )}

                        {isDataBoardSuccess &&
                            listIndex > -1 &&
                            dataBoard?.data.lists[listIndex] && (
                                <div>
                                    {dataBoard?.data.lists[listIndex].cards.length > 0 ? (
                                        <div>
                                            <h3>Выберите карточку</h3>
                                            <select
                                                onChange={event => selectCard(event.target.value)}
                                            >
                                                <option value="">Выберите карточку</option>
                                                {dataBoard?.data.lists[listIndex].cards.map(
                                                    (card: ICard) => (
                                                        <option key={card.id} value={card.name}>
                                                            {card.name}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        </div>
                                    ) : (
                                        <p>Не содержит карточек</p>
                                    )}
                                </div>
                            )}
                    </div>
                    <div>
                        <PomodoroCards cards={cards} setCards={setCards} />
                    </div>
                </>
            )}
        </div>
    );
};

export default SelectCard;
