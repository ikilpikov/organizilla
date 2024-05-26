import ReactSlider from 'react-slider';
import { usePomodoroSettingsStore } from '../../store';
import './slider.scss';

const PomodoroSettings = () => {
    const { workTime, breakTime, setWorkTime, setBreakTime } = usePomodoroSettingsStore();
    return (
        <div className={'pomodoroSettings'}>
            <div className={'pomodoroSettings__content'}>
                <label>work: {workTime}:00</label>
                <ReactSlider
                    className={'slider'}
                    thumbClassName={'thumb'}
                    trackClassName={'track'}
                    value={workTime}
                    onChange={newValue => setWorkTime(newValue)}
                    min={1}
                    max={120}
                />
                <label>break: {breakTime}:00</label>
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
