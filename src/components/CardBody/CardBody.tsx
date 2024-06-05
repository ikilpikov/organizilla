import { useShowActionStore } from 'store';
import { FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useCardName from 'hooks/useCardName';
import useColors from 'hooks/useColors';
import TextEditor from 'components/TextEditor/TextEditor';
import { ICard } from 'types/entityTypes';
import COLOR_SHADES from 'constants/colorShades';
import cross from 'assets/icons/cross.svg';
import descriptionIcon from 'assets/icons/description.svg';
import styles from './CardBody.module.scss';

interface IDescription {
    description: string | null;
}
interface ICardBodyProps {
    card: ICard;
    description: IDescription;
    setIsHover: (isHover: boolean) => void;
}

const CardBody: FC<ICardBodyProps> = ({ card, description, setIsHover }) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const { data } = useColors(id!);
    const [cardName, setCardName] = useState(card.name);
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const setShowCardBody = useShowActionStore(state => state.setShowCardBody);
    const { mutate } = useCardName();
    const handleSave = () => {
        mutate({ cardId: card.id, name: cardName, boardId: id! });
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (textareaRef.current && !textareaRef.current.contains(event.target as Node)) {
            handleSave();
        }
    };
    useEffect(() => {
        if (isEditing) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isEditing]);

    return (
        <div className={styles.cardBody}>
            <div className={styles.cardBody__title}>
                {isEditing ? (
                    <textarea
                        ref={textareaRef}
                        value={cardName}
                        className={styles.cardBody__title_input}
                        onChange={event => setCardName(event.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        wrap="soft"
                    />
                ) : (
                    <h2 onClick={() => setIsEditing(true)}>{cardName}</h2>
                )}
                <img
                    src={cross}
                    width={25}
                    onClick={() => {
                        setShowCardBody(-1);
                        setIsHover(false);
                    }}
                    className={styles.cardBody__title_img}
                />
            </div>
            <div>
                <h4>{t('cardBody.')}</h4>
                <div className={styles.cardBody__labels}>
                    {data?.data &&
                        card.colors.map(color => (
                            <span
                                key={color}
                                style={{
                                    backgroundColor: COLOR_SHADES[color].backgroundColor,
                                    color: COLOR_SHADES[color].textColor,
                                }}
                            >
                                {data.data[color]}
                            </span>
                        ))}
                </div>
            </div>
            <div className={styles.cardBody__description}>
                <div className={styles.cardBody__description_title}>
                    <img
                        src={descriptionIcon}
                        width={30}
                        className={styles.cardBody__description_img}
                    />
                    <h2>{t('cardBody.description')}</h2>
                </div>
                <TextEditor description={description.description} cardId={card.id} />
            </div>
        </div>
    );
};

export default CardBody;
