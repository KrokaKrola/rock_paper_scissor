const GAME_CANDIDATES = {
  ROCK: 'rock',
  PAPER: 'paper',
  SCISSORS: 'scissors',
} as const;

const GAME_CANDIDATE_WINNING_MAP = {
  [GAME_CANDIDATES.ROCK]: [GAME_CANDIDATES.SCISSORS],
  [GAME_CANDIDATES.PAPER]: [GAME_CANDIDATES.ROCK],
  [GAME_CANDIDATES.SCISSORS]: [GAME_CANDIDATES.PAPER],
} as const;

const GAME_CONFIG = {
  initialBalance: 5000,
  betValue: 500,
  winningRates: [14, 3],
  gameCandidates: GAME_CANDIDATE_WINNING_MAP,
} as const;

export { GAME_CONFIG };
