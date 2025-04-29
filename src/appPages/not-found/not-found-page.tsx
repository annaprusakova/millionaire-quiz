'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/ui/button/button';
import styles from './not-found.module.scss';

export default function NotFoundPage() {
  const router = useRouter();

  const handleStartPage = () => {
    router.push('/');
  };

  return (
    <div className={styles.notFoundWrapper}>
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
      <Button onClick={handleStartPage} className={styles.notFoundButton}>
        Back to the quiz!
      </Button>
    </div>
  );
}
