import { FC } from 'react';
import { ICard } from '../../types/entityTypes';
import styles from './Card.module.scss';

interface ICardProps {
    card: ICard;
}
const Card: FC<ICardProps> = ({ card }) => {
    return (
        <div className={styles.card}>
            <h5>{card.name}</h5>
        </div>
    );
};

export default Card;
