import { useCallback, useEffect, useState } from 'react';

import { Answer } from '@/types';
import Option from '@/components/ui/option/option';
import { answerQuestion } from '@/store/quiz-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useSound } from '@/hooks/use-sound';
import styles from './option-list.module.scss';

type OptionListProps = {
  answers: Answer[];
};

const SHOW_ANSWER_DELAY = 500;
const NEXT_QUESTION_DELAY = 1000;

export default function OptionList({ answers }: OptionListProps) {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex } = useAppSelector((state) => state.quiz);
  const correctSound = useSound('/sounds/correct.mp3');
  const wrongSound = useSound('/sounds/wrong.mp3');

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setShowAnswer(false);
  }, [currentQuestionIndex]);

  const playFeedbackSound = useCallback(
    (answerId: string) => {
      const isCorrect = answers.find(
        (answer) => answer.id === answerId,
      )?.isCorrect;

      if (isCorrect) {
        correctSound.play();
      } else {
        wrongSound.play();
      }
    },
    [answers, correctSound, wrongSound],
  );

  const handleAnswer = useCallback(
    (answerId: string) => {
      if (selectedId !== null) return;

      setSelectedId(answerId);

      setTimeout(() => {
        setShowAnswer(true);
        playFeedbackSound(answerId);

        setTimeout(() => {
          dispatch(answerQuestion({ answerId }));
        }, NEXT_QUESTION_DELAY);
      }, SHOW_ANSWER_DELAY);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedId, playFeedbackSound],
  );

  return (
    <div className={styles.container}>
      {answers.map((answer) => (
        <Option
          key={answer.id}
          id={answer.id}
          text={answer.option}
          isCorrect={answer.isCorrect}
          isSelected={selectedId === answer.id}
          disabled={selectedId !== null}
          showAnswer={showAnswer}
          onOptionClickAction={() => handleAnswer(answer.id)}
        />
      ))}
    </div>
  );
}
