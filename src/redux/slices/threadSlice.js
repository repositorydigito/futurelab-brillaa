import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: '',
};

const threadSlice = createSlice({
  name: 'thread',
  initialState,
  reducers: {
    setThreadId(state, action) {
      state.threadId = action.payload;
    },
    clearThreadId(state) {
      state.threadId = '';
    },
  },
});

export const { setThreadId, clearThreadId } = threadSlice.actions;
export default threadSlice.reducer;