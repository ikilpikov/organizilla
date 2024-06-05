import { useState, useEffect, useRef, useCallback } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import PomodoroButton from '../PomodoroButton/PomodoroButton';
import { usePomodoroSettingsStore } from '../../store';
import pomodoroAlarm from '../../assets/sounds/pomodoroAlarm.mp3';
import 'react-circular-progressbar/dist/styles.css';
const red = '#f54e4e';
const green = '#4aec8c';

const Timer = () => {
    const [isPaused, setIsPaused] = useState(true);
    const [wasPlayingBeforePause, setWasPlayingBeforePause] = useState(false); // Track if audio was playing before pause
    const [mode, setMode] = useState('work');
    const [secondsLeft, setSecondsLeft] = useState(0);
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);
    const audioRef = useRef(new Audio(pomodoroAlarm));
    const workTime = usePomodoroSettingsStore(state => state.workTime);
    const breakTime = usePomodoroSettingsStore(state => state.breakTime);
    const isAlarmSound = usePomodoroSettingsStore(state => state.isAlarmSound);

    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    };

    const playAction = useCallback(() => {
        setIsPaused(false);
        isPausedRef.current = false;
        if (wasPlayingBeforePause) {
            audioRef.current.play(); // Resume audio playback if it was playing before
        }
    }, [wasPlayingBeforePause]);

    const pauseAction = useCallback(() => {
        setIsPaused(true);
        isPausedRef.current = true;
        if (!audioRef.current.paused) {
            audioRef.current.pause(); // Pause the audio playback when pausing
            setWasPlayingBeforePause(true); // Set flag to true if audio was playing before pause
        } else {
            setWasPlayingBeforePause(false); // Set flag to false if audio was not playing before pause
        }
    }, []);

    const pomodoroSoundPlay = () => {
        audioRef.current.play();
    };

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
    }, [workTime, breakTime]);

    const totalSeconds = mode === 'work' ? workTime * 60 : breakTime * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    useEffect(() => {
        if (secondsLeft === 57 && isAlarmSound) {
            pomodoroSoundPlay();
        }
    }, [secondsLeft, isAlarmSound]);

    return (
        <div>
            <div>
                <CircularProgressbar
                    value={percentage}
                    text={minutes + ':' + formattedSeconds}
                    styles={buildStyles({
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
