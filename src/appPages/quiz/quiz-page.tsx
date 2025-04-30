'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import cn from 'classnames';

import OptionList from '@/components/option-list/option-list';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { loadQuestions } from '@/store/quiz-slice';
import questionsData from '@/data/questions.json';
import RewardList from '@/components/reward-list/reward-list';
import Button from '@/components/ui/button/button';
import styles from './quiz.module.scss';
import CloseIcon from '../../../public/icons/close.svg';
import MenuIcon from '../../../public/icons/menu.svg';

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const { questions, currentQuestionIndex, status } = useAppSelector(
    (state) => state.quiz,
  );

  const questionsRewards = useMemo(
    () =>
      questions.length > 0 &&
      questions.map((question) => {
        return { reward: question.reward, id: question.id };
      }),
    [questions],
  );

  useEffect(() => {
    if (questions.length === 0) {
      dispatch(loadQuestions(questionsData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === 'ended') {
      router.push('/game-over');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsMenuOpen(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Button onClick={toggleMenu} className={styles.mobileMenuIcon}>
          <Image
            src={isMenuOpen ? CloseIcon : MenuIcon}
            alt={isMenuOpen ? 'Close icon' : 'Open menu icon'}
          />
        </Button>
      </div>

      {questions.length > 0 && (
        <div className={styles.questionWrapper}>
          <h2 className={styles.question}>
            {questions[currentQuestionIndex].question}
          </h2>
          <OptionList answers={questions[currentQuestionIndex].answers} />
        </div>
      )}

      <aside className={styles.asideMenu}>
        <RewardList
          rewardList={questionsRewards || []}
          currentQuestionId={currentQuestionIndex}
        />
      </aside>

      {isMenuOpen && (
        <div className={cn(styles.mobileMenu, isClosing && styles.closing)}>
          <div className={styles.mobileWrapper}>
            <RewardList
              rewardList={questionsRewards || []}
              currentQuestionId={currentQuestionIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
}
