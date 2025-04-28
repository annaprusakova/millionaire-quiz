import { Answer } from '@/types';
import Option from '@/components/ui/option/option';
import { answerQuestion } from '@/store/quiz-slice';
import { useAppDispatch } from '@/store/store';
import styles from './option-list.module.scss';

type OptionListProps = {
  answers: Answer[];
};

export default function OptionList({ answers }: OptionListProps) {
  const dispatch = useAppDispatch();

  const handleAnswer = (answerId: string) => {
    setTimeout(() => {
      dispatch(answerQuestion({ answerId }));
    }, 1000);
  };

  return (
    <div className={styles.container}>
      {answers.map((answer) => (
        <Option
          key={answer.id}
          id={answer.id}
          text={answer.option}
          isCorrect={answer.isCorrect}
          onOptionClick={handleAnswer}
        />
      ))}
    </div>
  );
}
