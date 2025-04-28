'use client';

import { useRouter } from 'next/navigation';
import cn from 'classnames';
import Button from '@/components/ui/button/button';
import Image from 'next/image';
import HandImg from '../../../public/hand-img.svg';
import styles from './main-layout.module.scss';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const router = useRouter();

  const handleStartGame = () => {
    router.push('/quiz');
  };

  return (
    <div className={cn(styles.layout, styles.background)}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image src={HandImg} alt="Hand image" fill priority />
        </div>
        <div className={styles.info}>
          {children}
          <Button onClick={handleStartGame}>
            {/* {stage === 'start' ? 'Start' : 'Try again'} */}
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
