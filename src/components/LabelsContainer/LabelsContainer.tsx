import { getColor } from '../../utils/colors';
import useColors from '../../hooks/useColors';
import { useParams } from 'react-router-dom';
import styles from './LabelsContainer.module.scss';

const LabelsContainer = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useColors(id!);
    console.log(data);

    const transformedData =
        data && data.data && typeof data.data === 'object'
            ? Object.entries(data.data).reduce(
                  (acc, [key, value]) => {
                      console.log(key);

                      acc[getColor(key)] = value as string;
                      return acc;
                  },
                  {} as Record<string, string>,
              )
            : {};

    return (
        <div className={styles.labelContainer}>
            {Object.entries(transformedData).length > 0 ? (
                Object.entries(transformedData).map(([key, value], index: number) => (
                    <div
                        key={index}
                        style={{ backgroundColor: key }}
                        className={styles.labelContainer__label}
                    >
                        {value as string}
                    </div>
                ))
            ) : (
                <div>No data available</div>
            )}
        </div>
    );
};

export default LabelsContainer;
