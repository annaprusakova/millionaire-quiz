'use client';

import cn from 'classnames';
import { useState } from 'react';
import styles from './option.module.scss';

type OptionsProps = {
  id: string;
  text: string;
  isCorrect: boolean;
  onOptionClick: (id: string) => void;
};

export default function Option({
  id,
  text,
  isCorrect,
  onOptionClick,
}: OptionsProps) {
  const [isSelected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setSelected(true);
    onOptionClick(id);
  };

  return (
    <div className={styles.container}>
      <div
        className={cn(
          styles.line,
          isSelected && isCorrect && styles.correct,
          isSelected && !isCorrect && styles.wrong,
        )}
      />

      <button
        type="submit"
        onClick={handleClick}
        className={cn(
          styles.diamondShape,
          isSelected && styles.selected,
          isSelected && isCorrect && styles.correct,
          isSelected && !isCorrect && styles.wrong,
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
          isSelected && isCorrect && styles.correct,
          isSelected && !isCorrect && styles.wrong,
        )}
      />
    </div>
  );
}
