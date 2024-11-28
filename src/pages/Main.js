import React, { useState } from "react";
import Header from "../components/Header";  // Импортируем компонент хедера
import Chats from "../components/Chats";
import Profile from "../components/Profile";
import ChatWindow from "../components/ChatWindow";

function Main() {
  const [state, setState] = useState('chats');
  const isAuthenticated = true; // Здесь можно заменить на состояние аутентификации

  const handleStateChange = (state) => {
    setState(state);
  }

  return (
    <div className="d-flex flex-column" style={{ height: "100vh" }}>
      {/* Хедер */}
      <Header isAuthenticated={isAuthenticated} openSettings={handleStateChange}/>

      {/* Основной контейнер с использованием грид-сетки */}
      <div className="container-fluid d-flex" style={{ flex: 1 }}>
        {/* Левая колонка (1/3 экрана) */}
        <div className={`col-12 col-md-4 border-end p-3`}>
          {state === 'chats' ? (
            <Chats />
          ) : state === 'profile' ? (
            <Profile handleGoBack={handleStateChange}/>
          ) : null}
        </div>

        {/* Правая колонка (2/3 экрана) */}
        <div className="col-12 col-md-8 p-3">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}

export default Main;
