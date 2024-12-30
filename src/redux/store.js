import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import threadReducer from './slices/threadSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    thread: threadReducer,
  },
});

export default store;