import { Question, StudySession, Subject, UserAnswer, StudyHistory } from './index';
import { LoadingState } from './api';

// useStudySession フックの戻り値型
export interface UseStudySessionReturn {
  session: StudySession | null;
  currentQuestion: Question | null;
  isLoading: boolean;
  error: string | null;
  startSession: (subject: Subject) => Promise<void>;
  submitAnswer: (answer: 1 | 2 | 3 | 4) => void;
  nextQuestion: () => void;
  resetSession: () => void;
}

// useLocalStorage フックの戻り値型
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  loading: boolean;
  error: string | null;
}

// useQuestions フックの戻り値型
export interface UseQuestionsReturn {
  questions: Question[];
  loading: boolean;
  error: string | null;
  refetch: (subject: Subject) => Promise<void>;
}

// useStudyHistory フックの戻り値型
export interface UseStudyHistoryReturn {
  history: StudyHistory[];
  loading: boolean;
  error: string | null;
  addHistory: (session: StudySession) => Promise<void>;
  clearHistory: () => Promise<void>;
}

// useTimer フックの戻り値型
export interface UseTimerReturn {
  seconds: number;
  minutes: number;
  hours: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
  isRunning: boolean;
}

// フック内で使用する状態の型
export interface SessionState {
  session: StudySession | null;
  loadingState: LoadingState;
  error: string | null;
}

export interface QuestionState {
  questions: Question[];
  currentIndex: number;
  answers: UserAnswer[];
}
