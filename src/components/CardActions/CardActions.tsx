import { FC } from 'react';
import useDeleteCard from '../../hooks/useDeleteCard';
import styles from './CardActions.module.scss';
interface ICardActionsProps {
    cardId: string;
    boardId: string;
}
const CardActions: FC<ICardActionsProps> = ({ cardId, boardId }) => {
    const { mutate } = useDeleteCard();
    return (
        <div className={styles.cardActions}>
            <h3>Открыть карточку</h3>
            <h3 onClick={() => mutate({ id: cardId, boardId })}>Удалить карточку</h3>
            <h3>Изменить метки</h3>
        </div>
    );
};

export default CardActions;
