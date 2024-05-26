import { FC, useRef, useState } from 'react';
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
    const [isHover, setIsHover] = useState(false);

    const showCardActions = useShowActionStore(state => state.showCardActions);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardNameRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();

    /*  useClickOutside(cardRef, () => setShowCardActions(-1), showCardActions == card.id && !isEdit);

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            if (selection && selection.type === 'Caret') {
                setIsEdit(false);
            }
        };
        document.addEventListener('selectionchange', handleSelectionChange);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };
    }, []); */

    const editCard = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event?.preventDefault();
        setShowCardActions(card.id);
        // setIsEdit(true);
        if (cardNameRef.current) {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                const range = document.createRange();
                range.selectNodeContents(cardNameRef.current);
                selection.addRange(range);
                cardNameRef.current.focus();
            }
        }
    };

    const handleBlur = () => {
        if (cardNameRef.current) {
            const newName = cardNameRef.current.textContent;
            console.log(newName);
            // логика отправления нового имени на сервак
        }
    };

    const closeCardActions = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            setShowCardActions(-1);
        }
    };

    return (
        <div
            className={styles.cardContainer}
            onKeyDown={event => closeCardActions(event)}
            ref={cardRef}
        >
            <div
                className={styles.card}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onContextMenu={event => editCard(event)}
                /*  onFocus={() => setIsEdit(true)}
                onBlur={() => setIsEdit(false)} */
            >
                <div
                    ref={cardNameRef}
                    className={styles.card__name}
                    contentEditable={showCardActions === card.id}
                    suppressContentEditableWarning
                    onBlur={handleBlur}
                >
                    {card.name}
                </div>
                {isHover && showCardActions !== card.id && (
                    <button className={styles.card__button} onClick={() => editCard()}>
                        <img src={pencil} width={16} alt="pencil" />
                    </button>
                )}
            </div>
            {showCardActions === card.id && (
                <div className={styles.card__actions}>
                    <CardActions cardId={card.id} boardId={id!} />
                </div>
            )}
        </div>
    );
};

export default Card;
