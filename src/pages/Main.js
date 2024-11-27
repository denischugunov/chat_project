import React from "react";
import { Outlet, Routes, Route } from "react-router-dom";
import Chats from "../components/Chats";
import Profile from "../components/Profile";

import ChatWindow from "../components/ChatWindow";

function Main() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Левая колонка (1/3 экрана) */}
      <div style={{ flex: 1, borderRight: "1px solid #ddd", padding: "10px" }}>
        <Chats />
      </div>

      {/* Правая колонка (2/3 экрана) */}
      <div style={{ flex: 2, padding: "10px" }}>
        <ChatWindow />
      </div>
    </div>
  );
}

export default Main;
