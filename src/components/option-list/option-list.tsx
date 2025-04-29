import { Answer } from '@/types';
import Option from '@/components/ui/option/option';
import { answerQuestion } from '@/store/quiz-slice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import styles from './option-list.module.scss';

type OptionListProps = {
  answers: Answer[];
};

export default function OptionList({ answers }: OptionListProps) {
  const dispatch = useAppDispatch();
  const { currentQuestionIndex } = useAppSelector((state) => state.quiz);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setSelectedId(null);
    setShowAnswer(false);
  }, [currentQuestionIndex]);

  const handleAnswer = (answerId: string) => {
    if (selectedId !== null) return;

    setSelectedId(answerId);

    setTimeout(() => {
      setShowAnswer(true);

      setTimeout(() => {
        dispatch(answerQuestion({ answerId }));
      }, 1000);
    }, 500);
  };

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
          onOptionClick={() => handleAnswer(answer.id)}
        />
      ))}
    </div>
  );
}
