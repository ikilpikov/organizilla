import ReactSlider from 'react-slider';
import { useTranslation } from 'react-i18next';
import { usePomodoroSettingsStore } from '../../../store';
import soundOn from '../../../assets/icons/soundOn.svg';
import soundOff from '../../../assets/icons/soundOff.svg';
import styles from './PomodoroSettings.module.scss';

const PomodoroSettings = () => {
    const { workTime, breakTime, isAlarmSound, setWorkTime, setBreakTime, setIsAlarmSound } =
        usePomodoroSettingsStore();
    const { t } = useTranslation();
    return (
        <div className={styles.pomodoroSettings}>
            <div className={styles.pomodoroSettings__content}>
                <label>
                    {t('settings.pomodoro.time.work')}: {workTime}:00
                </label>
                <ReactSlider
                    className={styles.slider}
                    thumbClassName={styles.thumb}
                    trackClassName={styles.track}
                    value={workTime}
                    onChange={newValue => setWorkTime(newValue)}
                    min={1}
                    max={60}
                />
                <label>
                    {t('settings.pomodoro.time.break')}: {breakTime}:00
                </label>
                <ReactSlider
                    className={`${styles.slider} ${styles.green}`}
                    thumbClassName={styles.thumb}
                    trackClassName={styles.track}
                    value={breakTime}
                    onChange={newValue => setBreakTime(newValue)}
                    min={1}
                    max={15}
                />
                <div className={styles.pomodoroSettings__content_sound}>
                    <h3>{t('settings.pomodoro.sound.alarm')}</h3>
                    {isAlarmSound ? (
                        <img src={soundOn} width={30} onClick={() => setIsAlarmSound(false)} />
                    ) : (
                        <img src={soundOff} width={30} onClick={() => setIsAlarmSound(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PomodoroSettings;
