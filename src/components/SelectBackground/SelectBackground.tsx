import React, { useState, useEffect } from 'react';
import useBackgroundImages from '../../hooks/useBackgroundImages';
import { IBackgroundImage, IURL } from '../../types/entityTypes';
import styles from './SelectBackground.module.scss';
import { useBackgroundImageStore } from '../../store';
import { resizeImage } from '../../utils/utils';

const SelectBackground = React.memo(() => {
    const backgroundImagePageNumber = useBackgroundImageStore(
        state => state.backgroundImagePageNumber,
    );
    const setSelectedBackground = useBackgroundImageStore(state => state.setSelectedBackground);
    const [backgroundImages, setBackgroundImages] = useState<{ urls: IURL }[]>([]);

    const [selectedImage, setSelectedImage] = useState(0);
    const { data, isError } = useBackgroundImages(backgroundImagePageNumber);
    useEffect(() => {
        if (data) {
            console.log(data);
            setBackgroundImages([
                ...backgroundImages,
                ...data.data.results.map((item: IBackgroundImage) => {
                    return { urls: item.urls };
                }),
            ]);
        }
    }, [data, backgroundImagePageNumber]);
    console.log(backgroundImages);

    const selectImage = (index: number) => {
        const regularBackground = resizeImage(backgroundImages[index].urls.regular, 700);

        setSelectedBackground([regularBackground, backgroundImages[index].urls.full]);
        setSelectedImage(index);
        // Устанавливаем индекс выбранного изображения
    };
    return (
        <div className={styles.imageContainer}>
            {!isError &&
                backgroundImages.map((backgroundImage: { urls: IURL }, index) => {
                    return (
                        <img
                            key={index}
                            src={backgroundImage.urls.thumb}
                            alt={`Background ${index}`}
                            height={130}
                            width={200}
                            className={`${styles.image} ${selectedImage === index ? styles.image__selected : ''}`}
                            onClick={() => selectImage(index)}
                        />
                    );
                })}
        </div>
    );
});

export default SelectBackground;
