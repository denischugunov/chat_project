import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Formik } from "formik";
import * as yup from "yup";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";

// Предустановленные аватары
const avatars = [
  "/images/avatars/avatar_1.png",
  "/images/avatars/avatar_2.png",
  "/images/avatars/avatar_3.png",
];

function Profile({ handleGoBack }) {
  const currentUserId = useSelector((state) => state.user.user); // Получаем ID пользователя из redux
  const [userData, setUserData] = useState(null); // Храним данные пользователя
  console.log(currentUserId);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Создаем ссылку на документ пользователя в коллекции "users"
        const docRef = doc(db, "users", currentUserId); // Правильная ссылка на документ

        // Получаем документ
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Если документ существует, сохраняем данные в state
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (currentUserId) {
      fetchUserData(); // Получаем данные пользователя при изменении currentUserId
    }
  }, [currentUserId]);

  // Схема валидации
  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    avatar: yup.string().required("Please select an avatar"),
  });

  // Если данные пользователя еще не загружены, показываем индикатор загрузки
  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="d-flex justify-content-center vh-100">
      <Card style={{ width: "100%", maxWidth: "500px" }} className="p-4 shadow">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <button
              type="button"
              onClick={() => handleGoBack("chats")} // Обработчик события для кнопки назад
              className="btn btn-link"
              style={{ position: "absolute", left: "10px", top: "10px" }}
            >
              <i
                className="bi bi-arrow-left-circle"
                style={{ fontSize: "24px" }}
              ></i>
            </button>
            Profile Settings
          </Card.Title>
          <Formik
            validationSchema={schema}
            initialValues={{
              name: userData.name || "", // Заполняем имя из данных пользователя
              email: userData.email || "", // Заполняем email из данных пользователя
              avatar: userData.profilePic || avatars[0], // Заполняем аватар
            }}
            onSubmit={async (values) => {
              try {
                // Отправляем обновленные данные в Firestore
                await setDoc(doc(db, "users", currentUserId), {
                  name: values.name,
                  email: values.email,
                  profilePic: values.avatar,
                }, { merge: true });
                alert("Profile updated successfully!");
              } catch (error) {
                console.error("Error updating document:", error);
                alert("Failed to update profile.");
              }
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
