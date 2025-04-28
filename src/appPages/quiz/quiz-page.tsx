'use client';

import OptionList from '@/components/option-list/option-list';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useMemo, useState } from 'react';
import { loadQuestions } from '@/store/quiz-slice';
import questionsData from '@/data/questions.json';
import RewardList from '@/components/reward-list/reward-list';
import { useRouter } from 'next/navigation';
import styles from './quiz.module.scss';

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className={styles.mobileMenuIcon}
      >
        {isMenuOpen ? 'x' : '|||'}
      </button>

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
    </div>
  );
}
