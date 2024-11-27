import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import * as yup from "yup";

// Предустановленные аватары
const avatars = [
  "/images/avatars/avatar_1.png",
  "/images/avatars/avatar_2.png",
  "/images/avatars/avatar_3.png",
];

function Profile() {
  // Схема валидации
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    avatar: yup.string().required("Please select an avatar"),
  });

  return (
    <Container className="d-flex justify-content-center vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">Profile Settings</Card.Title>
          <Formik
            validationSchema={schema}
            initialValues={{
              name: "John Doe", // Текущее имя
              email: "john.doe@example.com", // Текущая почта
              password: "", // Пароль скрыт
              avatar: avatars[0], // Текущий аватар
            }}
            onSubmit={(values) => {
              console.log("Updated Profile:", values);
              alert("Profile updated successfully!");
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              setFieldValue,
              touched,
              errors,
              initialValues,
            }) => {
              // Проверка изменений
              const hasChanges =
                JSON.stringify(values) !== JSON.stringify(initialValues);

              return (
                <Form noValidate onSubmit={handleSubmit}>
                  {/* Поле Name */}
                  <Form.Group className="mb-3" controlId="validationFormik01">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Поле Email */}
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Поле Password */}
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter new password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Поле Avatar */}
                  <Form.Group className="mb-4">
                    <Form.Label>Choose an Avatar</Form.Label>
                    <div className="d-flex justify-content-between">
                      {avatars.map((avatar, index) => (
                        <div key={index} className="text-center">
                          <Form.Check
                            type="radio"
                            id={`avatar-${index}`}
                            name="avatar"
                            value={avatar}
                            onChange={(event) => {
                              setFieldValue("avatar", event.target.value);
                            }}
                            checked={values.avatar === avatar}
                            className="d-none"
                          />
                          <label htmlFor={`avatar-${index}`}>
                            <img
                              src={avatar}
                              alt={`Avatar ${index + 1}`}
                              className={`img-thumbnail rounded-circle ${
                                values.avatar === avatar ? "border-primary" : ""
                              }`}
                              style={{
                                width: "70px",
                                height: "70px",
                                cursor: "pointer",
                                borderWidth:
                                  values.avatar === avatar ? "3px" : "1px",
                              }}
                              onClick={() => setFieldValue("avatar", avatar)}
                            />
                          </label>
                        </div>
                      ))}
                    </div>
                    {touched.avatar && errors.avatar && (
                      <div className="text-danger mt-2">{errors.avatar}</div>
                    )}
                  </Form.Group>

                  {/* Кнопка Confirm Changes */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={!hasChanges}
                      className="btn btn-success rounded-circle ms-auto"
                      style={{
                        width: "65px",
                        height: "65px",
                        display: "flex",
                        backgroundColor: "blue",
                        alignItems: "center",
                        justifyContent: "center",
                        opacity: hasChanges ? 1 : 0.6,
                        pointerEvents: hasChanges ? "auto" : "none",
                      }}
                    >
                      <i
                        className="bi bi-check-lg"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Profile;
