import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: null,
    email: null,
    displayName: null,
    uid: null
  },
  reducers: {
    setAuth: (state, action) => {
      const { isAuthenticated, email, displayName, uid } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.email = email;
      state.displayName = displayName;
      state.uid = uid;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions

export default authSlice.reducer