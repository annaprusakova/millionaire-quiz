'use client';

import cn from 'classnames';
import { useState } from 'react';
import styles from './option.module.scss';

type OptionsProps = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export default function Option({ id, text, isCorrect }: OptionsProps) {
  const [isSelected, setSelected] = useState<boolean>(false);

  const handleClick = () => {
    setSelected(true);
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
          isSelected && isCorrect && styles.correct,
          isSelected && !isCorrect && styles.wrong,
        )}
      >
        <div className={styles.textContainer}>
          <span className={styles.id}>{id}</span>
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
