import { useShowActionStore } from 'store';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAddCard from 'hooks/useAddCard';
import useClickOutside from 'hooks/useClickOutside';
import cross from 'assets/icons/cross.svg';
import styles from '../CreateCard.module.scss';

interface ICreateCardFormProps {
    listId: number;
    boardId: string;
}

const CreateCardForm: FC<ICreateCardFormProps> = ({ listId, boardId }) => {
    const { t } = useTranslation();
    const { mutate } = useAddCard();
    const [cardName, setCardName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const setShowAddCard = useShowActionStore(state => state.setShowAddCard);
    const cardAddRef = useRef<HTMLDivElement>(null);
    useClickOutside(cardAddRef, () => setShowAddCard(-1), isOpen);
    useEffect(() => setIsOpen(true), []);
    const addList = () => {
        const cardData = { name: cardName, listId, boardId };
        mutate(cardData);
        setShowAddCard(-1);
    };
    return (
        <div className={styles.createListForm} ref={cardAddRef}>
            <input
                placeholder={t('cardActions.addCard.placeholder')}
                value={cardName}
                onChange={event => setCardName(event.target.value)}
            />
            <div className={styles.createListForm__addCard}>
                <button onClick={() => addList()} disabled={!cardName}>
                    {t('cardActions.addCard.button')}
                </button>
                <img src={cross} width={30} onClick={() => setShowAddCard(-1)} />
            </div>
        </div>
    );
};

export default CreateCardForm;
