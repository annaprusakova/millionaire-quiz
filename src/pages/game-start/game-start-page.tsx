import MainLayout from '@/components/main-layout/main-layout';
import styles from './game-start.module.scss';

export default function GameStartPage() {
  return (
    <MainLayout>
      <h1 className={styles.title}>Who wants to be a millionaire?</h1>
    </MainLayout>
  );
}
