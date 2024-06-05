import { FC, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useClickOutside from '../../../hooks/useClickOutside';
import useList from '../../../hooks/useList';
import cross from '../../../assets/icons/cross.svg';
import styles from '../CreateList.module.scss';
import { useTranslation } from 'react-i18next';

interface ICreateListFormProps {
    setIsAddList: (isAddList: boolean) => void;
}
const CreateListForm: FC<ICreateListFormProps> = ({ setIsAddList }) => {
    const { t } = useTranslation();
    const { mutate } = useList();
    const [name, setName] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { id } = useParams();
    const listAddRef = useRef<HTMLDivElement>(null);
    useClickOutside(listAddRef, () => setIsAddList(false), isOpen);
    useEffect(() => setIsOpen(true), []);
    const addList = () => {
        const listData = { name, boardId: id! };
        mutate(listData);
        setIsAddList(false);
    };
    return (
        <div className={styles.createListForm} ref={listAddRef}>
            <input
                placeholder={t('listActions.addList.placeholder')}
                value={name}
                onChange={event => setName(event.target.value)}
            />
            <div className={styles.createListForm__addClose}>
                <button onClick={() => addList()} disabled={!name}>
                    {t('listActions.addList.button')}
                </button>
                <img src={cross} width={30} onClick={() => setIsAddList(false)} />
            </div>
        </div>
    );
};

export default CreateListForm;
