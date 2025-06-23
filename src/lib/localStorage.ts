import { StudyHistory, QuestionMastery, LocalStorageData } from '@/types';
import { STORAGE_KEYS } from '@/types/storage';

// ローカルストレージの安全な操作
class LocalStorageManager {
  private isClient = typeof window !== 'undefined';

  // データを安全に取得
  private safeGet<T>(key: string): T | null {
    if (!this.isClient) return null;

    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return null;
    }
  }

  // データを安全に保存
  private safeSet<T>(key: string, value: T): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  // データを安全に削除
  private safeRemove(key: string): boolean {
    if (!this.isClient) return false;

    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  }

  // 学習履歴の取得
  getStudyHistory(): StudyHistory[] {
    const history = this.safeGet<StudyHistory[]>(STORAGE_KEYS.STUDY_HISTORY);
    return history || [];
  }

  // 学習履歴の保存
  saveStudyHistory(history: StudyHistory[]): boolean {
    return this.safeSet(STORAGE_KEYS.STUDY_HISTORY, history);
  }

  // 学習履歴に新しいセッションを追加
  addStudyHistory(newHistory: StudyHistory): boolean {
    const currentHistory = this.getStudyHistory();
    const updatedHistory = [newHistory, ...currentHistory];

    // 最大保存件数を制限（100件）
    const limitedHistory = updatedHistory.slice(0, 100);

    return this.saveStudyHistory(limitedHistory);
  }

  // 問題習得状況の取得
  getQuestionMastery(): QuestionMastery[] {
    const mastery = this.safeGet<QuestionMastery[]>(STORAGE_KEYS.QUESTION_MASTERY);
    return mastery || [];
  }

  // 問題習得状況の保存
  saveQuestionMastery(mastery: QuestionMastery[]): boolean {
    return this.safeSet(STORAGE_KEYS.QUESTION_MASTERY, mastery);
  }

  // 特定の問題の習得状況を更新
  updateQuestionMastery(
    questionId: number,
    subject: string,
    isCorrect: boolean
  ): boolean {
    const currentMastery = this.getQuestionMastery();
    const existingIndex = currentMastery.findIndex(
      m => m.questionId === questionId && m.subject === subject
    );

    if (existingIndex >= 0) {
      // 既存の記録を更新
      const existing = currentMastery[existingIndex];
      currentMastery[existingIndex] = {
        ...existing,
        correctCount: isCorrect ? existing.correctCount + 1 : existing.correctCount,
        totalAttempts: existing.totalAttempts + 1,
        lastAttemptAt: new Date(),
        masteryLevel: this.calculateMasteryLevel(
          isCorrect ? existing.correctCount + 1 : existing.correctCount,
          existing.totalAttempts + 1
        ),
      };
    } else {
      // 新しい記録を追加
      currentMastery.push({
        questionId,
        subject: subject as any,
        correctCount: isCorrect ? 1 : 0,
        totalAttempts: 1,
        lastAttemptAt: new Date(),
        masteryLevel: isCorrect ? 2 : 1,
      });
    }

    return this.saveQuestionMastery(currentMastery);
  }

  // 習得レベルを計算
  private calculateMasteryLevel(correctCount: number, totalAttempts: number): 1 | 2 | 3 | 4 {
    if (totalAttempts === 0) return 1;

    const correctRate = correctCount / totalAttempts;

    if (correctRate >= 0.9 && correctCount >= 3) return 4; // 完全習得
    if (correctRate >= 0.7 && correctCount >= 2) return 3; // 習得済み
    if (correctRate >= 0.5 || correctCount >= 1) return 2; // 練習中
    return 1; // 未習得
  }

  // 全データのクリア
  clearAllData(): boolean {
    const keys = Object.values(STORAGE_KEYS);
    let success = true;

    keys.forEach(key => {
      if (!this.safeRemove(key)) {
        success = false;
      }
    });

    return success;
  }

  // データのエクスポート
  exportData(): LocalStorageData | null {
    if (!this.isClient) return null;

    return {
      studyHistory: this.getStudyHistory(),
      questionMastery: this.getQuestionMastery(),
      lastUpdated: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  // データのインポート
  importData(data: LocalStorageData): boolean {
    if (!this.isClient) return false;

    try {
      this.saveStudyHistory(data.studyHistory);
      this.saveQuestionMastery(data.questionMastery);
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

// シングルトンインスタンス
export const localStorageManager = new LocalStorageManager();

// 便利な関数をエクスポート
export const {
  getStudyHistory,
  saveStudyHistory,
  addStudyHistory,
  getQuestionMastery,
  saveQuestionMastery,
  updateQuestionMastery,
  clearAllData,
  exportData,
  importData,
} = localStorageManager;
