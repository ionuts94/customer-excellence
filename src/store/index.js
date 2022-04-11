import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user.js';
import authReducer from './auth.js';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer
  },
})