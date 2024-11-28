import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Main from "./pages/Main";
import ChatWindow from "./components/ChatWindow";
import { onAuthStateChanged } from "firebase/auth";
import { Spinner, Container } from "react-bootstrap";
import { auth } from "./firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice"; // Импорт экшена для сохранения пользователя

function App() {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserState(currentUser);
      setLoading(false);
      dispatch(setUser(currentUser.uid)); // Сохраняем пользователя в Redux
    });

    return () => unsubscribe(); // Отписываемся от изменений
  }, [dispatch]);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <BrowserRouter>

      <Routes>
        {/* Публичные маршруты */}
        <Route path="/reg" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Защищённые маршруты */}
        <Route
          path="/"
          element={!!user ? <Main /> : <Navigate to="/login" replace />}
        >
          {/* Страница чата */}
          <Route path="chat" element={<ChatWindow />} /> {/* Главная страница чата */}
          <Route path="chat/:id" element={<ChatWindow />} /> {/* Динамическое окно чата */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
