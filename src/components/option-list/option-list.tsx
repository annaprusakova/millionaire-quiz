import { Answer } from '@/types';
import Option from '@/components/ui/option/option';
import styles from './option-list.module.scss';

type OptionListProps = {
  answers: Answer[];
};

export default function OptionList({ answers }: OptionListProps) {
  return (
    <div className={styles.container}>
      {answers.map((answer) => (
        <Option
          key={answer.id}
          id={answer.id}
          text={answer.option}
          isCorrect={answer.isCorrect}
        />
      ))}
    </div>
  );
}
