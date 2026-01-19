export interface Question {
  id: string;
  value: number;
  clue: string;
  answer: string; // This is the correct citation/response
  explanation?: string;
  isDailyDouble?: boolean;
}

export interface Category {
  id: string;
  title: string;
  questions: Question[];
}

export interface Team {
  id: number;
  name: string;
  score: number;
}

export type GamePhase = 'SETUP' | 'BOARD' | 'QUESTION' | 'ANSWER_REVEAL' | 'FINAL_JEOPARDY' | 'GAME_OVER';

export interface GameState {
  phase: GamePhase;
  categories: Category[];
  teams: Team[];
  currentQuestionId: string | null;
  answeredQuestions: string[]; // Set of Question IDs
  activeTeamId: number | null; // Which team buzzed in or is selecting
}
