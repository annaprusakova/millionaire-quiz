'use client';

import { useRouter } from 'next/navigation';
import cn from 'classnames';
import Image from 'next/image';

import Button from '@/components/ui/button/button';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { loadQuestions, restartQuiz } from '@/store/quiz-slice';
import questionsData from '@/data/questions.json';
import styles from './main-layout.module.scss';
import HandImg from '../../../public/hand-img.svg';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { status } = useAppSelector((state) => state.quiz);

  const handleStartGame = () => {
    if (status === 'ended') {
      dispatch(restartQuiz());
    } else {
      dispatch(loadQuestions(questionsData));
    }
    router.push('/quiz');
  };

  return (
    <div className={cn(styles.layout, status !== 'ended' && styles.background)}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <Image
            src={HandImg}
            alt="Hand image"
            priority
            className={styles.responsiveImage}
            width={624}
            height={367}
            sizes="(max-width: 767px) 288px, (max-width: 1023px) 600px, 624px"
          />
        </div>
        <div className={styles.info}>
          {children}
          <Button onClick={handleStartGame} className={styles.button}>
            {status !== 'ended' ? 'Start' : 'Try again'}
          </Button>
        </div>
      </div>
    </div>
  );
}
