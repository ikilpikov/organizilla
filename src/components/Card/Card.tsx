import { FC, useRef, useState } from 'react';
import { ICard } from '../../types/entityTypes';
import pencil from '../../assets/icons/pencil.svg';
import styles from './Card.module.scss';
import CardActions from '../CardActions/CardActions';
import { useShowActionStore } from '../../store';
import { useParams } from 'react-router-dom';
import useCard from '../../hooks/useCard';
import useColors from '../../hooks/useColors'; // Make sure to import useColors
import COLOR_SHADES from '../../constants/colorShades';
import CardBody from '../CardBody/CardBody';

interface ICardProps {
    card: ICard;
}

const Card: FC<ICardProps> = ({ card }) => {
    const [isHover, setIsHover] = useState(false);
    const showCardActions = useShowActionStore(state => state.showCardActions);
    const showCardBody = useShowActionStore(state => state.showCardBody);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);
    const setShowCardBody = useShowActionStore(state => state.setShowCardBody);
    const cardRef = useRef<HTMLDivElement>(null);
    const cardNameRef = useRef<HTMLDivElement>(null);
    const { id } = useParams();
    const { data, refetch } = useCard(card.id);
    const { data: dataColors } = useColors(id!);

    const editCard = (event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event?.preventDefault();
        setShowCardActions(card.id);
        /* if (cardNameRef.current) {
            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
                const range = document.createRange();
                range.selectNodeContents(cardNameRef.current);
                selection.addRange(range);
                cardNameRef.current.focus();
            }
        } */
    };

    const handleBlur = () => {
        if (cardNameRef.current) {
            const newName = cardNameRef.current.textContent;
            console.log(newName);
            // логика отправления нового имени на сервак
        }
    };

    const closeCardActions = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const target = event.target as HTMLElement;
        if (event.key === 'Enter' && !target.classList.contains('ql-editor')) {
            setShowCardActions(-1);
        }
    };

    const openCard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const targetElement = event.target as HTMLElement;
        const isInsideCardActions = targetElement.closest('.cardActions');

        if (targetElement instanceof HTMLImageElement) {
            const imgSrc = targetElement.src;
            if (imgSrc.includes('cross.svg')) {
                setShowCardActions(-1);
            } else {
                setShowCardActions(card.id);
            }
        } else if (targetElement instanceof HTMLButtonElement && showCardBody === -1) {
            setShowCardActions(card.id);
        } else if (!isInsideCardActions) {
            refetch();
            setShowCardBody(card.id);
        }
    };

    return (
        <div
            className={styles.cardContainer}
            onKeyDown={event => closeCardActions(event)}
            ref={cardRef}
            onClick={event => openCard(event)}
        >
            <div
                className={styles.card}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                onContextMenu={event => editCard(event)}
            >
                <div className={styles.card__colors}>
                    {card.colors.map((color, index) => (
                        <div
                            key={index}
                            className={styles.card__colorBlock}
                            style={{
                                backgroundColor:
                                    COLOR_SHADES[color as keyof typeof COLOR_SHADES]
                                        .backgroundColor,
                                color: COLOR_SHADES[color as keyof typeof COLOR_SHADES].textColor,
                            }}
                        >
                            {dataColors && dataColors.data[color] && (
                                <span className={styles.card__colorName}>
                                    {dataColors.data[color]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
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
                    <CardActions cardId={card.id} boardId={id!} colors={card.colors} />
                </div>
            )}
            {showCardBody === card.id && data?.data && (
                <div>
                    <CardBody card={card} description={data?.data} />
                </div>
            )}
        </div>
    );
};

export default Card;
