import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  answers: {},
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload; // Guardar preguntas
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer; // Guardar respuesta por ID de pregunta
    },
  },
});

export const { setQuestions, setAnswer } = questionsSlice.actions;

export default questionsSlice.reducer;
