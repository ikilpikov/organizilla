import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import MailCodePage from './pages/MailCodePage/MailCodePage';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import ImportDataPage from './pages/ImportDataPage/ImportDataPage';
import PomodoroPage from './pages/PomodoroPage/PomodoroPage';
import CalendarPage from './pages/CalendarPage/CalendarPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import CreateBoardPage from './pages/CreateBoardPage/CreateBoardPage';
import CreateNewBoardPage from './pages/CreateNewBoardPage/CreateNewBoardPage';
import CreateTemplateBoardPage from './pages/CreateTemplateBoardPage.tsx/CreateTemplateBoardPage';

import './App.css';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/registration/mail" element={<MailCodePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/import" element={<ImportDataPage />} />
                <Route path="/pomodoro" element={<PomodoroPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/create-board" element={<CreateBoardPage />} />
                <Route path="/create-board/blank" element={<CreateNewBoardPage />} />
                <Route path="/create-board/template" element={<CreateTemplateBoardPage />} />
            </Routes>
        </>
    );
}

export default App;
