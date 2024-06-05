import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDeleteCard from '../../hooks/useDeleteCard';
import CreateNewLabel from '../CreateNewLabel/CreateNewLabel';
import { useShowActionStore } from '../../store';
import cross from '../../assets/icons/cross.svg';
import styles from './CardActions.module.scss';

interface ICardActionsProps {
    colors: string[];
    cardId: number;
    boardId: string;
    isBottom: boolean;
    setIsHover: (isHover: boolean) => void;
}
const CardActions: FC<ICardActionsProps> = ({
    cardId,
    boardId,
    colors: initialColors,
    isBottom,
    setIsHover,
}) => {
    const { t } = useTranslation();
    const { mutate } = useDeleteCard();
    const [isVisibleLabels, setIsVisibleLabels] = useState(false);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);
    const setShowCardBody = useShowActionStore(state => state.setShowCardBody);
    const [colors, setColors] = useState(initialColors);

    return (
        <div className="cardActions">
            <div className={styles.cardActions}>
                <div className={styles.cardActions__title}>
                    <h3>{t('cardActions.actions.title')}</h3>
                    <img
                        src={cross}
                        width={20}
                        onClick={() => {
                            setShowCardActions(-1);
                            setIsHover(false);
                        }}
                    />
                </div>
                <h4 onClick={() => setShowCardBody(cardId)}>{t('cardActions.actions.open')}</h4>
                <h4 onClick={() => setIsVisibleLabels(!isVisibleLabels)}>
                    {t('cardActions.actions.change')}
                </h4>
                <h4 onClick={() => mutate({ id: cardId, boardId })}>
                    {t('cardActions.actions.delete')}
                </h4>
            </div>
            {isVisibleLabels && (
                <div
                    className={`${styles.labelContainer} ${isBottom ? styles.labelContainer__buttom : ''}`}
                >
                    <CreateNewLabel
                        setIsVisibleLabels={setIsVisibleLabels}
                        cardId={cardId}
                        colors={colors}
                        setColors={setColors}
                        setIsHover={setIsHover}
                    />
                </div>
            )}
        </div>
    );
};

export default CardActions;
