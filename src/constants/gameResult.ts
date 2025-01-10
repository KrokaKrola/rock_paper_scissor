const GAME_RESULT = {
  TIE: 'TIE',
  WIN: 'WIN',
  LOSS: 'LOSS',
} as const;

type GameResultKeys = keyof typeof GAME_RESULT;
export type GameResult = (typeof GAME_RESULT)[GameResultKeys];

export { GAME_RESULT };
