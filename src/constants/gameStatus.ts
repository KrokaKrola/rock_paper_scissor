const GAME_STATUS = {
  WAITING_FOR_BETS: 'WAITING_FOR_BETS',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
} as const;

type GameStatusKeys = keyof typeof GAME_STATUS;
export type GameStatus = (typeof GAME_STATUS)[GameStatusKeys];

export { GAME_STATUS };
