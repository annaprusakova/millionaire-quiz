'use client';

import MainLayout from '@/components/main-layout/main-layout';
import { formatReward } from '@/utils/format-reward';
import { useAppSelector } from '@/store/store';

export default function GameOverPage() {
  const { earnedReward } = useAppSelector((state) => state.quiz);

  return (
    <MainLayout>
      <div>
        <h4>Total score:</h4>
        <h1>{formatReward(earnedReward)} earned</h1>
      </div>
    </MainLayout>
  );
}
