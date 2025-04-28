import { Answer } from '@/types/answer';

export type Question = {
  id: string;
  question: string;
  answers: Answer[];
  reward: number;
};
