import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useCardColor from 'hooks/useCardColor';
import useColors from 'hooks/useColors';
import LabelsContainer from 'components/LabelsContainer/LabelsContainer';
import { ILabel } from 'types/entityTypes';
import COLOR_SHADES from 'constants/colorShades';
import cross from 'assets/icons/cross.svg';
import styles from './CreateNewLabel.module.scss';

interface ICreateNewLabelProps {
    setIsVisibleLabels: (isVisible: boolean) => void;
    cardId: number;
    colors: string[];
    setColors: (colors: string[]) => void;
    setIsHover: (isHover: boolean) => void;
}

const CreateNewLabel: FC<ICreateNewLabelProps> = ({
    setIsVisibleLabels,
    cardId,
    colors,
    setColors,
    setIsHover,
}) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const { data } = useColors(id!);
    const [isCreateLabel, setIsCreateLabel] = useState(false);
    const { mutate } = useCardColor();
    const labelsCollection: ILabel = data?.data;
    let sortedData: [string, string | null][] = [];
    if (data && data.data && typeof labelsCollection === 'object') {
        sortedData = Object.entries(data.data)
            .filter((entry): entry is [string, string | null] => {
                const value = entry[1];
                return typeof value === 'string' || value === null;
            })
            .sort((a, b) => {
                const valueA = a[1];
                const valueB = b[1];
                if (valueA === null) return 1;
                if (valueB === null) return -1;
                return valueA.localeCompare(valueB);
            })
            .slice(0, 8);
    }
    const changeCardColors = (cardId: number, color: string, checked: boolean) => {
        const action = checked ? 'set' : 'unset';
        mutate({ boardId: id!, cardId, color, action });

        // Update local colors state
        setColors(prevColors => {
            if (checked) {
                return [...prevColors, color];
            } else {
                return prevColors.filter(c => c !== color);
            }
        });
    };
    return (
        <>
            <div className={styles.createNewLabel}>
                <div className={styles.createNewLabel__title}>
                    <h4>{t('labels.title')}</h4>
                    <img
                        src={cross}
                        width={20}
                        onClick={() => {
                            setIsVisibleLabels(false);
                            setIsHover(false);
                        }}
                    />
                </div>
                {sortedData.length > 0 &&
                    sortedData.map(([key, value], index: number) => (
                        <div className={styles.createNewLabel__label} key={index}>
                            <input
                                type="checkbox"
                                checked={colors.includes(key)}
                                onChange={event =>
                                    changeCardColors(cardId, key, event.target.checked)
                                }
                            />
                            <div
                                key={index}
                                style={{
                                    backgroundColor:
                                        COLOR_SHADES[key as keyof typeof COLOR_SHADES]
                                            .backgroundColor,
                                    color: COLOR_SHADES[key as keyof typeof COLOR_SHADES].textColor,
                                }}
                                className={styles.createNewLabel__label_color}
                            >
                                {value as string}
                            </div>
                        </div>
                    ))}
                <button
                    onClick={() => setIsCreateLabel(true)}
                    className={styles.createNewLabel__label_button}
                >
                    {t('labels.addLabel')}
                </button>
            </div>
            {isCreateLabel && (
                <LabelsContainer
                    labels={labelsCollection}
                    setIsVisibleLabels={setIsVisibleLabels}
                    setIsCreateLabel={setIsCreateLabel}
                    setIsHover={setIsHover}
                />
            )}
        </>
    );
};

export default CreateNewLabel;
