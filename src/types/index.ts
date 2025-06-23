// 科目の型定義
export type Subject = 'social' | 'science' | 'japanese';

// 問題の型定義
export interface Question {
  id: number;
  subject: Subject;
  questionText: string;
  choices: [string, string, string, string]; // 4択固定
  correctAnswer: 1 | 2 | 3 | 4; // 正解番号（1-4）
  explanation: string;
}

// 学習セッションの型定義
export interface StudySession {
  id: string;
  subject: Subject;
  questions: Question[];
  startTime: Date;
  endTime?: Date;
  currentQuestionIndex: number;
  answers: UserAnswer[];
  isCompleted: boolean;
}

// ユーザーの回答の型定義
export interface UserAnswer {
  questionId: number;
  selectedAnswer: 1 | 2 | 3 | 4;
  isCorrect: boolean;
  answeredAt: Date;
}

// 学習履歴の型定義
export interface StudyHistory {
  sessionId: string;
  subject: Subject;
  totalQuestions: number;
  correctAnswers: number;
  completedAt: Date;
  timeSpent: number; // 秒単位
}

// 問題の習得状況（将来の拡張用）
export interface QuestionMastery {
  questionId: number;
  subject: Subject;
  correctCount: number;
  totalAttempts: number;
  lastAttemptAt: Date;
  masteryLevel: 1 | 2 | 3 | 4; // 1:未習得 2:練習中 3:習得済み 4:完全習得
}

// 科目の表示名マッピング
export const SUBJECT_LABELS: Record<Subject, string> = {
  social: '社会',
  science: '理科',
  japanese: '国語'
} as const;

// 科目の色テーマ
export const SUBJECT_COLORS: Record<Subject, string> = {
  social: 'bg-blue-500',
  science: 'bg-green-500',
  japanese: 'bg-purple-500'
} as const;

// 定数定義
export const QUESTIONS_PER_SESSION = 10;
export const GOOGLE_SHEETS_ID = '1ZoV6Xv0z_uQdWFzpfpdLr2wTwCoFFP_u5bcupJx6vYo';
export const SHEET_NAMES: Record<Subject, string> = {
  social: '社会',
  science: '理科',
  japanese: '国語'
} as const;
