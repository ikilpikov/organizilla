import { useState, useEffect, useRef, useCallback } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PomodoroButton from '../PomodoroButton/PomodoroButton';
import { usePomodoroSettingsStore } from '../../store';
import 'react-circular-progressbar/dist/styles.css';
const red = '#f54e4e';
const green = '#4aec8c';

const Timer = () => {
    const workTime = usePomodoroSettingsStore(state => state.workTime);
    const breakTime = usePomodoroSettingsStore(state => state.breakTime);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    };

    const playAction = useCallback(() => {
        setIsPaused(false);
        isPausedRef.current = false;
    }, []);

    const pauseAction = useCallback(() => {
        setIsPaused(true);
        isPausedRef.current = true;
    }, []);

    useEffect(() => {
        const switchMode = () => {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? workTime : breakTime) * 60;

            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        };

        secondsLeftRef.current = workTime * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [workTime, breakTime]); // Убедитесь, что зависимости включают только нужные значения

    const totalSeconds = mode === 'work' ? workTime * 60 : breakTime * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    return (
        <div>
            <div>
                <CircularProgressbar
                    value={percentage}
                    text={minutes + ':' + formattedSeconds}
                    styles={buildStyles({
                        //textColor: timerTheme === 'dark' ? '#fff' : '#000',
                        pathColor: mode === 'work' ? red : green,
                        trailColor: 'grey',
                    })}
                />
                <div>
                    {isPaused ? (
                        <PomodoroButton action={playAction} image="play" />
                    ) : (
                        <PomodoroButton action={pauseAction} image="pause" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Timer;
