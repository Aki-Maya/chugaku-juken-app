import { ReactNode } from 'react';
import { Question, StudySession, Subject } from './index';

// 基本コンポーネントのProps
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: boolean;
  border?: boolean;
}

// 学習関連コンポーネントのProps
export interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: 1 | 2 | 3 | 4) => void;
  showResult?: boolean;
  selectedAnswer?: 1 | 2 | 3 | 4;
  disabled?: boolean;
}

export interface ChoiceButtonProps {
  choice: string;
  index: 1 | 2 | 3 | 4;
  selected?: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  onClick: (index: 1 | 2 | 3 | 4) => void;
}

export interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export interface SubjectSelectorProps {
  onSubjectSelect: (subject: Subject) => void;
  disabled?: boolean;
}

export interface SubjectCardProps {
  subject: Subject;
  onClick: (subject: Subject) => void;
  disabled?: boolean;
  stats?: {
    totalQuestions: number;
    correctRate: number;
    lastStudied?: Date;
  };
}

// 結果表示コンポーネントのProps
export interface ResultSummaryProps {
  session: StudySession;
  onRestart: () => void;
  onBackToHome: () => void;
}

export interface QuestionResultProps {
  question: Question;
  userAnswer: 1 | 2 | 3 | 4;
  showExplanation?: boolean;
  onNext?: () => void;
}

// ユーティリティコンポーネントのProps
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export interface ErrorDisplayProps {
  error: string | Error;
  onRetry?: () => void;
  showRetryButton?: boolean;
  className?: string;
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// レイアウトコンポーネントのProps
export interface LayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

// 統計表示コンポーネントのProps
export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}
