import { Answer } from '@/types/answer';

export type Question = {
  id: number;
  question: string;
  answers: Answer[];
  reward: number;
};
