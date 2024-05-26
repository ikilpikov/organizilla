import React, { FC } from 'react';
import playButton from '../../assets/icons/playButton.svg';
import pauseButton from '../../assets/icons/pauseButton.svg';
import styles from './PomodoroButton.module.scss';

interface IPomodoroButtonProps {
    action: () => void;
    image: string;
}

const PomodoroButton: FC<IPomodoroButtonProps> = React.memo(
    ({ action, image }) => {
        return (
            <button onClick={action} className={styles.pomodoroButton}>
                <img
                    src={image === 'play' ? playButton : pauseButton}
                    alt="play/pause button"
                    width={80}
                />
            </button>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.image === nextProps.image && prevProps.action === nextProps.action;
    },
);

export default PomodoroButton;
