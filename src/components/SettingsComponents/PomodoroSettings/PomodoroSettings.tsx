import ReactSlider from 'react-slider';
import { useTranslation } from 'react-i18next';
import { usePomodoroSettingsStore } from '../../../store';
import './slider.scss';

const PomodoroSettings = () => {
    const { workTime, breakTime, setWorkTime, setBreakTime } = usePomodoroSettingsStore();
    const { t } = useTranslation();
    return (
        <div className={'pomodoroSettings'}>
            <div className={'pomodoroSettings__content'}>
                <label>
                    {t('settings.pomodoro.time.work')}: {workTime}:00
                </label>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={workTime}
                    onChange={newValue => setWorkTime(newValue)}
                    min={1}
                    max={120}
                />
                <label>
                    {t('settings.pomodoro.time.break')}: {breakTime}:00
                </label>
                <ReactSlider
                    className={'slider green'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={breakTime}
                    onChange={newValue => setBreakTime(newValue)}
                    min={1}
                    max={120}
                />
            </div>
        </div>
    );
};

export default PomodoroSettings;
