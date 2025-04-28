import OptionList from '@/components/option-list/option-list';
import styles from './quiz.module.scss';

export default function QuizPage() {
  return (
    <div className={styles.container}>
      <OptionList
        answers={[
          { id: 'A', option: 'test1', isCorrect: false },
          { id: 'B', option: 'test2', isCorrect: true },
          { id: 'C', option: 'test3', isCorrect: false },
          { id: 'D', option: 'test4', isCorrect: false },
        ]}
      />
    </div>
  );
}
