import { Routes, Route } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import MailCodePage from "./pages/MailCodePage/MailCodePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import ImportDataPage from "./pages/ImportDataPage/ImportDataPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration/mail" element={<MailCodePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/import" element={<ImportDataPage />} />
      </Routes>
    </>
  );
}

export default App;
