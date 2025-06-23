import { Question, Subject, StudyHistory } from './index';

// Google Sheets API関連の型定義
export interface GoogleSheetsConfig {
  apiKey: string;
  spreadsheetId: string;
  range: string;
}

// Google Sheets APIレスポンスの型定義
export interface SheetsResponse {
  range: string;
  majorDimension: string;
  values: string[][];
}

// API呼び出しの結果型
export type ApiResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: ApiError;
};

// APIエラーの型定義
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

// 問題データの生データ（Google Sheetsから取得）
export interface RawQuestionData {
  questionNumber: string;    // A列: 問題番号
  questionText: string;      // B列: 問題文
  choice1: string;          // C列: 選択肢1
  choice2: string;          // D列: 選択肢2
  choice3: string;          // E列: 選択肢3
  choice4: string;          // F列: 選択肢4
  correctAnswer: string;    // G列: 正解番号(1-4)
  explanation: string;      // H列: 解説
}

// API呼び出し関数の型定義
export type FetchQuestionsFunction = (
  subject: Subject
) => Promise<ApiResult<Question[]>>;

export type SaveStudyHistoryFunction = (
  history: StudyHistory
) => Promise<void>;

export type LoadStudyHistoryFunction = () => Promise<StudyHistory[]>;

// ローディング状態の管理
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

// エラーハンドリング用の型
export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
