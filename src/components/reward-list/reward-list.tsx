import { formatReward } from '@/utils/format-reward';
import cn from 'classnames';
import styles from './reward-list.module.scss';

type RewardListProps = {
  rewardList: { reward: number; id: number }[];
  currentQuestionId: number;
};

export default function RewardList({
  rewardList,
  currentQuestionId,
}: RewardListProps) {
  return (
    <ul className={styles.list}>
      {rewardList.map((reward) => (
        <li key={reward.id} className={styles.rewardContainer}>
          <div
            className={cn(
              styles.line,
              reward.id === currentQuestionId && styles.active,
            )}
          />
          <div
            className={cn(
              styles.reward,
              reward.id === currentQuestionId && styles.active,
              currentQuestionId > reward.id && styles.passed,
            )}
          >
            <span>{formatReward(reward.reward)}</span>
          </div>
          <div
            className={cn(
              styles.line,
              reward.id === currentQuestionId && styles.active,
            )}
          />
        </li>
      ))}
    </ul>
  );
}
