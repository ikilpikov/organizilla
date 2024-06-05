import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useColorValue from 'hooks/useColorValue';
import { ILabel } from 'types/entityTypes';
import COLOR_SHADES from 'constants/colorShades';
import cross from 'assets/icons/cross.svg';
import leftArrow from 'assets/icons/leftArrowSmall.svg';
import styles from './LabelsContainer.module.scss';

interface ILabelsContainerProps {
    labels: ILabel;
    setIsVisibleLabels: (isVisible: boolean) => void;
    setIsCreateLabel: (isCreate: boolean) => void;
    setIsHover: (isHover: boolean) => void;
}
const LabelsContainer: FC<ILabelsContainerProps> = ({
    labels,
    setIsVisibleLabels,
    setIsCreateLabel,
    setIsHover,
}) => {
    const { t } = useTranslation();
    const { id } = useParams();
    const [colorName, setColorName] = useState('');
    const [viewBGColor, setViewBGColor] = useState({ HEX: '#008000', color: 'green' });
    const { mutate } = useColorValue();
    const setColor = () => {
        const colorData = { boardId: id!, color: viewBGColor.color, value: colorName };
        mutate(colorData);
        setColorName('');
    };
    const selectColor = (key: string) => {
        setViewBGColor({
            HEX: COLOR_SHADES[key as keyof typeof COLOR_SHADES].backgroundColor,
            color: key,
        });
    };
    return (
        <div className={styles.labelsContainer}>
            <div className={styles.labelsContainer__title}>
                <img src={leftArrow} width={15} onClick={() => setIsCreateLabel(false)} />
                <h3>{t('labels.createLabel.title')}</h3>
                <img
                    src={cross}
                    width={20}
                    onClick={() => {
                        setIsVisibleLabels(false);
                        setIsHover(false);
                    }}
                />
            </div>
            <div className={styles.labelsContainer__view}>
                <div
                    style={{
                        backgroundColor: viewBGColor.HEX,
                        color: COLOR_SHADES[viewBGColor.color as keyof typeof COLOR_SHADES]
                            .textColor,
                    }}
                    className={styles.labelsContainer__view_label}
                >
                    {colorName}
                </div>
            </div>
            <div className={styles.labelsContainer__input}>
                <label>{t('labels.createLabel.labelName')}</label>
                <input value={colorName} onChange={event => setColorName(event.target.value)} />
            </div>
            <div>{t('labels.createLabel.labelColor')}</div>
            <div className={styles.labelsContainer__color}>
                {Object.entries(labels).length > 0 &&
                    Object.entries(labels).map(([key], index: number) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor:
                                    COLOR_SHADES[key as keyof typeof COLOR_SHADES].backgroundColor,
                            }}
                            className={styles.labelsContainer__color_label}
                            onClick={() => selectColor(key)}
                        ></div>
                    ))}
            </div>
            <div className={styles.labelsContainer__button}>
                <button onClick={() => setColor()}>{t('labels.createLabel.create')}</button>
            </div>
        </div>
    );
};

export default LabelsContainer;
