import { useFontSizeStore } from 'store';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ChangeSystemFormat.module.scss';

const ChangeSystemFormat = () => {
    const { fontSize, setFontSize } = useFontSizeStore();
    const { t } = useTranslation();

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
                {t('settings.appearance.systemFormat.size.small')}
            </button>
            <button
                className={fontSize === '16px' ? styles.active : ''}
                onClick={() => setFontSize('16px')}
            >
                {t('settings.appearance.systemFormat.size.medium')}
            </button>
            <button
                className={fontSize === '20px' ? styles.active : ''}
                onClick={() => setFontSize('20px')}
            >
                {t('settings.appearance.systemFormat.size.large')}
            </button>
        </div>
    );
};

export default ChangeSystemFormat;
