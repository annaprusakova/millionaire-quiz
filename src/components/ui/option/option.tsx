'use client';

import cn from 'classnames';
import styles from './option.module.scss';

type OptionsProps = {
  id: string;
  text: string;
  isCorrect: boolean;
  isSelected: boolean;
  disabled: boolean;
  showAnswer: boolean;
  onOptionClick: () => void;
};

export default function Option({
  id,
  text,
  isCorrect,
  isSelected,
  disabled,
  showAnswer,
  onOptionClick,
}: OptionsProps) {
  const isPreSelected = isSelected && !showAnswer;
  const isCorrectAnswer = isSelected && isCorrect && showAnswer;
  const isWrongAnswer = isSelected && !isCorrect && showAnswer;

  return (
    <div className={styles.container}>
      <div
        className={cn(
          styles.line,
          isCorrectAnswer && styles.correct,
          isWrongAnswer && styles.wrong,
        )}
      />

      <button
        type="submit"
        onClick={onOptionClick}
        disabled={disabled}
        className={cn(
          styles.diamondShape,
          isPreSelected && styles.selected,
          isCorrectAnswer && styles.correct,
          isWrongAnswer && styles.wrong,
        )}
      >
        <div className={styles.textContainer}>
          <span className={styles.id}>{id.slice(0, 1)}</span>
          <span>{text}</span>
        </div>
      </button>

      <div
        className={cn(
          styles.line,
          isCorrectAnswer && styles.correct,
          isWrongAnswer && styles.wrong,
        )}
      />
    </div>
  );
}
