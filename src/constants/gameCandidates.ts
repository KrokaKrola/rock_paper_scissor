const GAME_CANDIDATES = {
  ROCK: 'ROCK',
  PAPER: 'PAPER',
  SCISSORS: 'SCISSORS',
} as const;

type GameCandidatesKeys = keyof typeof GAME_CANDIDATES;
export type GameCandidate = (typeof GAME_CANDIDATES)[GameCandidatesKeys];

export { GAME_CANDIDATES };
