import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import bin from 'assets/icons/bin.svg';
import styles from './PomodoroCards.module.scss';

interface IPomodoroCard {
    name: string;
    complete: boolean;
}

interface IPomodoroCardsProps {
    cards: IPomodoroCard[];
    setCards: (card: IPomodoroCard[]) => void;
}

const PomodoroCards: FC<IPomodoroCardsProps> = ({ cards, setCards }) => {
    const { t } = useTranslation();
    const handleCheckboxChange = (index: number) => {
        const newCards = cards.map((card, i) =>
            i === index ? { ...card, complete: !card.complete } : card,
        );
        setCards(newCards);
    };

    const completedCards = cards.filter(card => card.complete);
    const incompleteCards = cards.filter(card => !card.complete);

    const removePomodoroCard = (index: number) => {
        const newCards = cards.filter((_, i) => i != index);
        setCards(newCards);
    };
    return (
        <div className={styles.pomodoroCards}>
            <div>
                <h1>{t('selectTask.pomodoroCards.title')}</h1>
            </div>
            <div className={styles.pomodoroCards__state}>
                <div className={styles.pomodoroCards__state_active}>
                    <h2>{t('selectTask.pomodoroCards.active')}</h2>
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
                    <h2>{t('selectTask.pomodoroCards.complete')}</h2>
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
