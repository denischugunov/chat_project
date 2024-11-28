import { createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/config"; // Импортируем Firestore
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore"; // Импорт необходимых функций из Firestore

// Начальное состояние
const initialState = {
  messages: [], // Массив с сообщениями чата
  loading: false, // Статус загрузки сообщений
  error: null, // Возможные ошибки
};

// Создаем slice для работы с чатом
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // Загружаем сообщения в состояние
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload); // Добавляем новое сообщение в состояние
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setMessages, addMessage, setLoading, setError } = chatSlice.actions;

// Асинхронное действие для получения сообщений
export const fetchMessages = (chatId) => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    // Формируем запрос для получения сообщений из Firestore
    const q = query(collection(db, "chats", chatId, "messages"), orderBy("timestamp", "asc"));

    // Подписываемся на изменения
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      dispatch(setMessages(messages)); // Обновляем сообщения в Redux
    });

    // Убедимся, что отписка происходит, если компонент будет удален
    return unsubscribe;
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Асинхронное действие для отправки сообщения
// Асинхронное действие для отправки сообщения
export const sendMessage = (chatId, message) => async (dispatch) => {
  try {
    // Добавляем сообщение в Firestore
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: message.text,
      userId: message.userId,
      timestamp: serverTimestamp(), // Серверное время для метки времени
    });

    // Не обновляем Redux сразу. Это произойдет при получении данных через onSnapshot
  } catch (error) {
    dispatch(setError(error.message));
  }
};


export default chatSlice.reducer;
