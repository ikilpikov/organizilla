import { FC, useState } from 'react';
import useDeleteCard from '../../hooks/useDeleteCard';
import styles from './CardActions.module.scss';
import cross from '../../assets/icons/cross.svg';
import { useShowActionStore } from '../../store';
import CreateNewLabel from '../CreateNewLabel/CreateNewLabel';
interface ICardActionsProps {
    cardId: number;
    boardId: string;
}
const CardActions: FC<ICardActionsProps> = ({ cardId, boardId }) => {
    const { mutate } = useDeleteCard();
    const [isVisibleLabels, setIsVisibleLabels] = useState(false);
    const setShowCardActions = useShowActionStore(state => state.setShowCardActions);

    return (
        <div>
            <div className={styles.cardActions}>
                <div className={styles.cardActions__title}>
                    <h3>Действия с карточкой</h3>
                    <img src={cross} width={20} onClick={() => setShowCardActions(-1)} />
                </div>
                <h4>Открыть карточку</h4>
                <h4 onClick={() => mutate({ id: cardId, boardId })}>Удалить карточку</h4>
                <h4 onClick={() => setIsVisibleLabels(!isVisibleLabels)}>Изменить метки</h4>
            </div>
            {isVisibleLabels && (
                <div className={styles.labelContainer}>
                    <CreateNewLabel setIsVisibleLabels={setIsVisibleLabels} />
                </div>
            )}
        </div>
    );
};

export default CardActions;
