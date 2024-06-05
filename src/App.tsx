import { Route, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage/AuthPage';
import BoardPage from './pages/BoardPage/BoardPage';
import CreateBoardPage from './pages/CreateBoardPage/CreateBoardPage';
import CreateNewBoardPage from './pages/CreateNewBoardPage/CreateNewBoardPage';
import ImportDataPage from './pages/ImportDataPage/ImportDataPage';
import MailCodePage from './pages/MailCodePage/MailCodePage';
import MainPage from './pages/MainPage/MainPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PomodoroPage from './pages/PomodoroPage/PomodoroPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import SettingsPage from './pages/SettingsPage/SettingsPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/registration" element={<RegistrationPage />} />
                <Route path="/registration/mail" element={<MailCodePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/import" element={<ImportDataPage />} />
                <Route path="/create-board" element={<CreateBoardPage />} />
                <Route path="/create-board/blank" element={<CreateNewBoardPage />} />
                <Route path="/board/:id" element={<BoardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/pomodoro" element={<PomodoroPage />} />
            </Routes>
        </>
    );
}

export default App;
