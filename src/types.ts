// Create type definitions for the application.
export interface Denomination {
  label: string;
  value: number; // in cents
  type: 'bill' | 'coin';
}

export enum GameState {
  NotStarted,
  Playing,
  Correct,
  Incorrect,
  TimesUp,
  ShiftOver,
}

export enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

export interface DifficultySettings {
    maxCost: number; // in cents
    time: number; // in seconds
}

export interface TransactionData {
    timeTaken: number;
    result: 'correct' | 'incorrect' | 'timesup';
}
