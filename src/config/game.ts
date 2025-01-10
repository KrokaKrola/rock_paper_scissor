const GAME_CANDIDATES = {
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS',
} as const;

type GameCandidatesKeys = keyof typeof GAME_CANDIDATES;
export type GameCandidate = (typeof GAME_CANDIDATES)[GameCandidatesKeys];

const GAME_CANDIDATES_WINNING_MAP: Record<GameCandidate, Array<GameCandidate>> = {
  [GAME_CANDIDATES.ROCK]: [GAME_CANDIDATES.SCISSORS],
  [GAME_CANDIDATES.PAPER]: [GAME_CANDIDATES.ROCK],
  [GAME_CANDIDATES.SCISSORS]: [GAME_CANDIDATES.PAPER],
} as const;

const GAME_CONFIG: {
  initialBalance: number;
  betValue: number;
  winningRates: Record<number, number>;
  gameCandidates: Record<GameCandidate, Array<GameCandidate>>;
  maximumSimultaneousCandidates: number;
} = {
  initialBalance: 5000,
  betValue: 500,
  winningRates: {
    1: 14,
    2: 3,
  },
  gameCandidates: GAME_CANDIDATES_WINNING_MAP,
  maximumSimultaneousCandidates: 2,
} as const;

export { GAME_CONFIG, GAME_CANDIDATES };
