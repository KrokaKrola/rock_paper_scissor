import { AppState } from '@/store/store';

import { GameService } from '@/services/GameService';

const gameBalanceSelector = (state: AppState) => state.game.balance;

const gameBetsSelector = (state: AppState) => state.game.bets;

const gameTotalBetValueSelector = (state: AppState) =>
  GameService.calculateTotalBetValue(state.game.bets);

const gameWinValueSelector = (state: AppState) => state.game.winValue;

const gameStatusSelector = (state: AppState) => state.game.status;

export {
  gameBalanceSelector,
  gameBetsSelector,
  gameTotalBetValueSelector,
  gameWinValueSelector,
  gameStatusSelector,
};
