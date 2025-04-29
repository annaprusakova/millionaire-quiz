'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/button/button';
import styles from './error.module.scss';

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.errorWrapper}>
      <h1>Unfortunately, something went wrong</h1>
      <Button onClick={reset} className={styles.errorButton}>
        Back to start!
      </Button>
    </div>
  );
}
