'use client';

import MainLayout from '@/components/main-layout/main-layout';
import { formatReward } from '@/utils/format-reward';
import { useAppSelector } from '@/store/store';
import styles from './game-over.module.scss';

export default function GameOverPage() {
  const { earnedReward } = useAppSelector((state) => state.quiz);

  return (
    <MainLayout>
      <div className={styles.finishWrapper}>
        <h4 className={styles.title}>Total score:</h4>
        <h1 className={styles.score}>{formatReward(earnedReward)} earned</h1>
      </div>
    </MainLayout>
  );
}
