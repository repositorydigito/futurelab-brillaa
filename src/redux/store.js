import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import questionsReducer from "./slices/questionsSlice";
import threadReducer from './slices/threadSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
    questions: questionsReducer,
  },
});

export default store;