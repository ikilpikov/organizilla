import { FC, useState } from 'react';
import { ICard } from '../../types/entityTypes';
import pencil from '../../assets/icons/pencil.svg';
import styles from './Card.module.scss';
import CardActions from '../CardActions/CardActions';
import { useShowActionStore } from '../../store';
import { useParams } from 'react-router-dom';

interface ICardProps {
    card: ICard;
}
const Card: FC<ICardProps> = ({ card }) => {
    const showCardActions = useShowActionStore(state => state.showCardActions);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);
    const [isHover, setIsHover] = useState(false);
    const { id } = useParams();
    const contextMenuHandler = (event: MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault();
        setShowCardActions(card.id);
    };
    return (
        <div className={styles.cardContainer}>
            <div
                className={styles.card}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onContextMenu={event => contextMenuHandler(event)}
            >
                <h5 className={styles.card__name}>{card.name}</h5>
                {isHover && (
                    <button className={styles.card__button}>
                        <img src={pencil} width={16} alt="pencil" />
                    </button>
                )}
            </div>
            {showCardActions === card.id && (
                <div className={styles.card__actions}>
                    <CardActions cardId={card.id.toString()} boardId={id!} />
                </div>
            )}
        </div>
    );
};

export default Card;
