export type DifficultyLevel = "facile" | "medio" | "difficile";

export type SessionPreset = "corto" | "standard" | "lungo";

export type SessionDifficultyMode = "facile" | "medio" | "difficile" | "bilanciato";

export interface SqlColumn {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  references?: {
    table: string;
    column: string;
  };
  description: string;
}

export interface SqlTable {
  name: string;
  label: string;
  description: string;
  columns: SqlColumn[];
}

export interface SqlExercise {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  keywords: string[];
  expectedQuery: string;
  hints: string[];
  relevantTables: string[];
  checkOrder?: boolean;
}

export interface QueryExecutionResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  error?: string;
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  userResult: QueryExecutionResult;
  expectedResult: QueryExecutionResult;
  differences?: {
    rowCountMatch: boolean;
    columnsMatch: boolean;
    missingColumns: string[];
    extraColumns: string[];
    userCount: number;
    expectedCount: number;
    firstDifference?: string;
  };
}

export interface SessionSettings {
  length: 5 | 10 | 20;
  difficultyMode: SessionDifficultyMode;
  enabledKeywords: string[];
}

export interface ExerciseAttempt {
  exerciseId: string;
  userQuery: string;
  isCorrect: boolean;
  attemptsCount: number;
  usedHints: number;
  usedGemini: boolean;
  timeSpentSeconds: number;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "gemini";
  text: string;
  timestamp: number;
}
