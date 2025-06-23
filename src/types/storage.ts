import { StudyHistory, QuestionMastery } from './index';

// ローカルストレージのデータ構造
export interface LocalStorageData {
  studyHistory: StudyHistory[];
  questionMastery: QuestionMastery[];
  lastUpdated: string;
  version: string;
}

// ローカルストレージのキー定義
export const STORAGE_KEYS = {
  STUDY_HISTORY: 'chugaku_juken_study_history',
  QUESTION_MASTERY: 'chugaku_juken_question_mastery',
  USER_PREFERENCES: 'chugaku_juken_user_preferences',
  SESSION_DATA: 'chugaku_juken_session_data'
} as const;

// ユーザー設定の型定義
export interface UserPreferences {
  preferredSubjects: Subject[];
  studyReminders: boolean;
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: 'ja' | 'en';
}

// セッションデータの型定義
export interface SessionData {
  currentSessionId?: string;
  lastActiveSubject?: Subject;
  pausedAt?: string;
  resumeData?: {
    questionIndex: number;
    answers: UserAnswer[];
  };
}

// ストレージ操作の結果型
export type StorageResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

// ストレージ操作関数の型定義
export type StorageGetFunction<T> = (key: string) => StorageResult<T | null>;
export type StorageSetFunction<T> = (key: string, value: T) => StorageResult<void>;
export type StorageRemoveFunction = (key: string) => StorageResult<void>;
export type StorageClearFunction = () => StorageResult<void>;
