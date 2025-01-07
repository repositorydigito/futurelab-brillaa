import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: '',
  valueProposition: "",
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
    setValueProposition: (state, action) => {
      state.valueProposition = action.payload; 
    },
  },
});

export const { setThreadId, clearThreadId, setValueProposition } = threadSlice.actions;
export default threadSlice.reducer;