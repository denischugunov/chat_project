import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";

function ChatWindow() {
  const { id } = useParams();

  const [messages, setMessages] = useState([
    { id: 1, sender: "You", text: "Hi there!", time: "10:30 AM" },
    { id: 2, sender: "Alex", text: "Hello!", time: "10:31 AM" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMsg]);
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
          <div
            className="flex-grow-1 overflow-auto p-3"
            style={{ backgroundColor: "transparent" }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`d-flex ${
                  message.sender === "You"
                    ? "justify-content-end"
                    : "justify-content-start"
                } mb-3`}
              >
                <div
                  className={`p-3 rounded ${
                    message.sender === "You"
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
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

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
