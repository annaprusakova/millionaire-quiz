import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Question } from '@/types';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  earnedReward: number;
  status: 'playing' | 'ended';
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  earnedReward: 0,
  status: 'playing',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    loadQuestions(state, action: PayloadAction<Question[]>) {
      state.questions = action.payload;
    },
    answerQuestion(state, action: PayloadAction<{ answerId: string }>) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      const selectedAnswer = currentQuestion.answers.find(
        (ans) => ans.id === action.payload.answerId,
      );
      if (selectedAnswer?.isCorrect) {
        state.earnedReward = currentQuestion.reward;
        if (state.currentQuestionIndex < state.questions.length - 1) {
          state.currentQuestionIndex += 1;
        } else {
          state.status = 'ended';
        }
      } else {
        state.status = 'ended';
      }
    },
    restartQuiz(state) {
      state.currentQuestionIndex = 0;
      state.earnedReward = 0;
      state.status = 'playing';
    },
  },
});

export const { loadQuestions, answerQuestion, restartQuiz } = quizSlice.actions;
export default quizSlice.reducer;
