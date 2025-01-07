import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: '',
  valueProposition: "",
  valueBrandStrategy: "",
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
    setValueBrandStrategy: (state, action) => {
      state.valueBrandStrategy = action.payload; 
    },
  },
});

export const { setThreadId, clearThreadId, setValueProposition, setValueBrandStrategy } = threadSlice.actions;
export default threadSlice.reducer;