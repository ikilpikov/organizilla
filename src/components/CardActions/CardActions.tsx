import { FC, useEffect, useRef, useState } from 'react';
import useDeleteCard from '../../hooks/useDeleteCard';
import styles from './CardActions.module.scss';
import LabelsContainer from '../LabelsContainer/LabelsContainer';
import useClickOutside from '../../hooks/useClickOutside';
import { useShowActionStore } from '../../store';
interface ICardActionsProps {
    cardId: number;
    boardId: string;
}
const CardActions: FC<ICardActionsProps> = ({ cardId, boardId }) => {
    const { mutate } = useDeleteCard();
    const [isVisibleLabels, setIsVisibleLabels] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const cardActionsRef = useRef<HTMLDivElement>(null);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);
    useClickOutside(cardActionsRef, () => setShowCardActions(-1), isOpen);
    useEffect(() => setIsOpen(true), []);
    return (
        <div>
            <div className={styles.cardActions} ref={cardActionsRef}>
                <h3>Открыть карточку</h3>
                <h3 onClick={() => mutate({ id: cardId, boardId })}>Удалить карточку</h3>
                <h3 onClick={() => setIsVisibleLabels(!isVisibleLabels)}>Изменить метки</h3>
            </div>
            {isVisibleLabels && <LabelsContainer />}
        </div>
    );
};

export default CardActions;
