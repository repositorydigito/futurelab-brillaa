import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  threadId: '',
  valueProposition: "",
  valueBrandStrategy: "",
  valuePublications: "",
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
    setValuePublications: (state, action) => {
      state.valuePublications = action.payload; 
    },
  },
});

export const { setThreadId, clearThreadId, setValueProposition, setValueBrandStrategy, setValuePublications } = threadSlice.actions;
export default threadSlice.reducer;