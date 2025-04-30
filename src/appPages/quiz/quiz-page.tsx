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

const MENU_ANIMATION_DURATION = 300;

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [menuState, setMenuState] = useState({
    isOpen: false,
    isClosing: false,
  });

  const { questions, currentQuestionIndex, status } = useAppSelector(
    (state) => state.quiz,
  );

  const questionsRewards = useMemo(
    () =>
      questions.length > 0
        ? questions.map((question) => ({
            reward: question.reward,
            id: question.id,
          }))
        : [],
    [questions],
  );

  const currentQuestion = questions[currentQuestionIndex];

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
    if (menuState.isOpen) {
      setMenuState({ isOpen: true, isClosing: true });
      setTimeout(() => {
        setMenuState({ isOpen: false, isClosing: false });
      }, MENU_ANIMATION_DURATION);
    } else {
      setMenuState({ isOpen: true, isClosing: false });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <Button onClick={toggleMenu} className={styles.mobileMenuIcon}>
          <Image
            src={menuState.isOpen ? CloseIcon : MenuIcon}
            alt={menuState.isOpen ? 'Close icon' : 'Open menu icon'}
          />
        </Button>
      </div>

      {questions.length > 0 && (
        <div className={styles.questionWrapper}>
          <h2 className={styles.question}>{currentQuestion.question}</h2>
          <OptionList answers={currentQuestion.answers} />
        </div>
      )}

      <aside className={styles.asideMenu}>
        <RewardList
          rewardList={questionsRewards || []}
          currentQuestionId={currentQuestionIndex}
        />
      </aside>

      {menuState.isOpen && (
        <div
          className={cn(
            styles.mobileMenu,
            menuState.isClosing && styles.closing,
          )}
        >
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
