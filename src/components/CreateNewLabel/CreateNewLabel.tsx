import { useParams } from 'react-router-dom';
import { FC, useState } from 'react';
import useColors from '../../hooks/useColors';
import LabelsContainer from '../LabelsContainer/LabelsContainer';
import COLOR_SHADES from '../../constants/colorShades';
import { ILabel } from '../../types/entityTypes';
import cross from '../../assets/icons/cross.svg';
import styles from './CreateNewLabel.module.scss';

interface ICreateNewLabelProps {
    setIsVisibleLabels: (isVisible: boolean) => void;
}
const CreateNewLabel: FC<ICreateNewLabelProps> = ({ setIsVisibleLabels }) => {
    const { id } = useParams<{ id: string }>();
    const { data } = useColors(id!);
    const [isCreateLabel, setIsCreateLabel] = useState(false);

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

    return (
        <>
            <div className={styles.createNewLabel}>
                <div className={styles.createNewLabel__title}>
                    <h4>Метки</h4>
                    <img src={cross} width={20} onClick={() => setIsVisibleLabels(false)} />
                </div>
                {sortedData.length > 0 &&
                    sortedData.map(([key, value], index: number) => (
                        <div className={styles.createNewLabel__label}>
                            <input type="checkbox" />
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
                <button onClick={() => setIsCreateLabel(true)}>Create label</button>
            </div>
            {isCreateLabel && (
                <LabelsContainer
                    labels={labelsCollection}
                    setIsVisibleLabels={setIsVisibleLabels}
                    setIsCreateLabel={setIsCreateLabel}
                />
            )}
        </>
    );
};

export default CreateNewLabel;
