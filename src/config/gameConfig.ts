import { GAME_CANDIDATES, GameCandidate } from '@/constants/gameCandidates';

interface GameConfigInterface {
  initialBalance: number;
  betValue: number;
  winningRates: Record<number, number>;
  gameCandidatesWinningMap: Record<GameCandidate, Array<GameCandidate>>;
  maximumSimultaneousCandidates: number;
  maximumBetValue: number;
}

const GAME_CONFIG: GameConfigInterface = {
  initialBalance: 5_000,
  betValue: 500,
  winningRates: {
    1: 14,
    2: 3,
  },
  gameCandidatesWinningMap: {
    [GAME_CANDIDATES.ROCK]: [GAME_CANDIDATES.SCISSORS],
    [GAME_CANDIDATES.PAPER]: [GAME_CANDIDATES.ROCK],
    [GAME_CANDIDATES.SCISSORS]: [GAME_CANDIDATES.PAPER],
  },
  maximumSimultaneousCandidates: 2,
  maximumBetValue: 10_000,
} as const;

export { GAME_CONFIG };
