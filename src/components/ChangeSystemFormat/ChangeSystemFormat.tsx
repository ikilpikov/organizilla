import { useEffect } from 'react';
import { useFontSizeStore } from '../../store';
import styles from './ChangeSystemFormat.module.scss';

const ChangeSystemFormat = () => {
    const { fontSize, setFontSize } = useFontSizeStore();
    console.log(fontSize);

    useEffect(() => {
        const storedFontSize = localStorage.getItem('font-size-storage');
        if (storedFontSize) {
            const parsedStorage = JSON.parse(storedFontSize);
            const initialFontSize = parsedStorage.state.fontSize;
            document.documentElement.style.setProperty('--font-size', initialFontSize);
        } else {
            document.documentElement.style.setProperty('--font-size', fontSize);
        }
    }, []);

    useEffect(() => {
        document.documentElement.style.setProperty('--font-size', fontSize);
    }, [fontSize]);

    return (
        <div className={styles.buttons}>
            <button
                className={fontSize === '14px' ? styles.active : ''}
                onClick={() => setFontSize('14px')}
            >
                Маленький
            </button>
            <button
                className={fontSize === '16px' ? styles.active : ''}
                onClick={() => setFontSize('16px')}
            >
                Средний
            </button>
            <button
                className={fontSize === '20px' ? styles.active : ''}
                onClick={() => setFontSize('20px')}
            >
                Большой
            </button>
        </div>
    );
};

export default ChangeSystemFormat;
