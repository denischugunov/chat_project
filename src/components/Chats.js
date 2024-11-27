import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

// Моковые данные для чатов
const chats = [
  {
    id: 1,
    avatar: "/images/avatars/avatar_1.png",
    name: "Alina",
    lastMessage: "See you tomorrow!",
    time: "10:30 AM",
  },
  {
    id: 2,
    avatar: "/images/avatars/avatar_2.png",
    name: "Alex",
    lastMessage: "Great job on the project!",
    time: "9:15 AM",
  },
  {
    id: 3,
    avatar: "/images/avatars/avatar_3.png",
    name: "Sophia",
    lastMessage: "Let's catch up soon.",
    time: "Yesterday",
  },
];

function Chats() {
  return (
    <Container className="d-flex justify-content-center vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Your chats</Card.Title>

          {/* Поле поиска */}
          <Form>
            <Form.Group className="mb-3" controlId="formBasicSearch">
              <Form.Label>Find users</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
          </Form>

          {/* Список чатов */}
          <ListGroup variant="flush">
            {chats.map((chat) => (
              <ListGroup.Item
                key={chat.id}
                className="d-flex align-items-center gap-3 p-3"
                style={{ cursor: "pointer" }}
              >
                {/* Аватар */}
                <img
                  src={chat.avatar}
                  alt={`${chat.name}'s avatar`}
                  className="rounded-circle"
                  style={{ width: "50px", height: "50px" }}
                />

                {/* Информация о чате */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between">
                    <strong>{chat.name}</strong>
                    <small className="text-muted">{chat.time}</small>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.9rem" }}>
                    {chat.lastMessage}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Chats;
