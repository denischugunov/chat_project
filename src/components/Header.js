import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

function Header({ isAuthenticated }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary py-2">
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center">
          <img
            alt="Logo"
            src="/images/chatLogo.png"
            width="30"
            height="30"
            className="d-inline-block align-top me-2"
          />
          <span className="fw-bold">ChatApp</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Theme Dropdown */}
            <Form className="d-flex align-self-lg-center me-3">
              <Form.Check // prettier-ignore
                type="switch"
                id="custom-switch"
                label="Theme"
              />
            </Form>
            {isAuthenticated ? (
              <NavDropdown
                title={
                  <img
                    src="/images/avatars/avatar_1.png"
                    alt="User Icon"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                }
                id="profile-nav-dropdown"
                className="me-3"
              >
                <NavDropdown.Item href="#action/2.1">Settings</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/2.2">Exit</NavDropdown.Item>
              </NavDropdown>
            ) : null}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

Header.defaultProps = {
  isAuthenticated: false,
};

export default Header;
