import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Подключаем useDispatch и useSelector
import { fetchMessages, sendMessage } from "../redux/chatSlice"; // Импортируем экшены из слайса
import ScrollToBottom from 'react-scroll-to-bottom'; 

function ChatWindow() {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Получаем сообщения из Redux
  const messages = useSelector((state) => state.chat.messages);
  const loading = useSelector((state) => state.chat.loading);
  const error = useSelector((state) => state.chat.error);
  const currentUserId = useSelector((state) => state.user.user);
  

  const [newMessage, setNewMessage] = useState("");

  // Загружаем сообщения при изменении chatId
  useEffect(() => {
    if (id) {
      dispatch(fetchMessages(id)); // Получаем сообщения при загрузке компонента
    }
  }, [id, dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        text: newMessage,
        userId: currentUserId, // Здесь можно установить ID текущего пользователя
      };
      dispatch(sendMessage(id, message)); // Отправляем сообщение через экшен Redux
      setNewMessage(""); // Очистить поле ввода
    }
  };

  return (
    <Container
      className="d-flex flex-column vh-100"
      style={{ maxWidth: "100%" }}
    >
      {id ? (
        <>
          {/* Заголовок чата */}
          <Card.Header className="text-center py-3 bg-light">
            Chat with User #{id}
          </Card.Header>

          {/* Переписка */}
          <ScrollToBottom
            className="flex-grow-1 overflow-auto p-3"
            style={{ backgroundColor: "transparent" }}
          >
            {loading ? (
              <div>Loading...</div> // Показать индикатор загрузки
            ) : error ? (
              <div>Error: {error}</div> // Показать ошибку, если она произошла
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`d-flex ${
                    message.userId === currentUserId
                      ? "justify-content-end"
                      : "justify-content-start"
                  } m-3`}
                >
                  <div
                    className={`p-3 rounded ${
                      message.userId === currentUserId
                        ? "bg-primary text-white"
                        : "bg-light text-dark"
                    }`}
                    style={{
                      maxWidth: "60%",
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                    }}
                  >
                    <div style={{ fontSize: "0.9rem" }}>{message.text}</div>
                    <div
                      className="text-muted"
                      style={{ fontSize: "0.75rem", textAlign: "right" }}
                    >
                      {(message.timestamp ? message.timestamp.toDate() : new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </ScrollToBottom>

          {/* Поле ввода */}
          <Form onSubmit={handleSendMessage} className="d-flex p-3 bg-white">
            <Form.Control
              type="text"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="me-2"
            />
            <Button type="submit" variant="primary">
              Send
            </Button>
          </Form>
        </>
      ) : (
        // Когда ID чата не выбран
        <Card.Header className="text-center py-3 bg-light">
          Choose a chat to start messaging
        </Card.Header>
      )}
    </Container>
  );
}

export default ChatWindow;
