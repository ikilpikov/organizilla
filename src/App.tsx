import { Routes, Route } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import MailCodePage from './pages/MailCodePage/MailCodePage';
import AuthPage from './pages/AuthPage/AuthPage';
import MainPage from './pages/MainPage/MainPage';
import ImportDataPage from './pages/ImportDataPage/ImportDataPage';
import CreateBoardPage from './pages/CreateBoardPage/CreateBoardPage';
import CreateNewBoardPage from './pages/CreateNewBoardPage/CreateNewBoardPage';
import BoardPage from './pages/BoardPage/BoardPage';

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
                <Route path="/create-board" element={<CreateBoardPage />} />
                <Route path="/create-board/blank" element={<CreateNewBoardPage />} />
                <Route path="/board/:id" element={<BoardPage />} />
            </Routes>
        </>
    );
}

export default App;
