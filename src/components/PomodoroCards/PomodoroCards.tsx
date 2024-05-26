import { FC } from 'react';
import styles from './PomodoroCards.module.scss';
import bin from '../../assets/icons/bin.svg';
interface IPomodoroCard {
    name: string;
    complete: boolean;
}

interface IPomodoroCardsProps {
    cards: IPomodoroCard[];
    setCards: (card: IPomodoroCard[]) => void;
}

const PomodoroCards: FC<IPomodoroCardsProps> = ({ cards, setCards }) => {
    const handleCheckboxChange = (index: number) => {
        const newCards = cards.map((card, i) =>
            i === index ? { ...card, complete: !card.complete } : card,
        );
        setCards(newCards);
    };

    const completedCards = cards.filter(card => card.complete);
    const incompleteCards = cards.filter(card => !card.complete);

    const removePomodoroCard = (index: number) => {
        console.log(index);
        console.log(cards);

        const newCards = cards.filter((_, i) => i != index);
        console.log(newCards);

        setCards(newCards);
    };
    return (
        <div className={styles.pomodoroCards}>
            <div>
                <h1>Список дел</h1>
            </div>
            <div className={styles.pomodoroCards__state}>
                <div className={styles.pomodoroCards__state_active}>
                    <h2>Активные</h2>
                    {incompleteCards.map((card, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={card.complete}
                                onChange={() => handleCheckboxChange(cards.indexOf(card))}
                            />
                            {card.name}
                            <img src={bin} width={20} onClick={() => removePomodoroCard(index)} />
                        </div>
                    ))}
                </div>
                <div className={styles.pomodoroCards__state_active}>
                    <h2>Выполненные</h2>
                    {completedCards.map((card, index) => (
                        <div key={index}>
                            <input
                                type="checkbox"
                                checked={card.complete}
                                onChange={() => handleCheckboxChange(cards.indexOf(card))}
                            />
                            {card.name}
                            <img src={bin} width={20} onClick={() => removePomodoroCard(index)} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PomodoroCards;
