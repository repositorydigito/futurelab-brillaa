import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  token: '',
  leadId: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.leadId = action.payload.leadId;
    },
    clearUser(state) {
      state.name = '';
      state.email = '';
      state.token = '';
      state.leadId = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;