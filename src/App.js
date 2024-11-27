import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Main from "./pages/Main";
import ChatWindow from "./components/ChatWindow";

function App() {
  const isAuth = false; // Состояние авторизации

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuth} />
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/reg" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Защищённые маршруты */}
        <Route
          path="/"
          element={isAuth ? <Main /> : <Navigate to="/login" replace />}
        >
          {/* Динамическое окно чата */}
          <Route path="chat/:id" element={<ChatWindow />} />
          {/* По умолчанию */}
          <Route path="*" element={<ChatWindow />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
