import { AppState } from '@/store/store';

import { BetService } from '@/services/BetService';
import { CandidatesService } from '@/services/CandidatesService';

const gameBalanceSelector = (state: AppState) => state.game.balance;

const gameBetsSelector = (state: AppState) => state.game.bets;

const gameTotalBetValueSelector = (state: AppState) =>
  BetService.calculateTotalBetValue(state.game.bets);

const gameWinValueSelector = (state: AppState) => state.game.winValue;

const gameStatusSelector = (state: AppState) => state.game.status;

const gamePlayerCandidateSelector = (state: AppState) =>
  CandidatesService.getPlayerCandidate(state.game.betsWithGameResultDto);

const gameComputerCandidateSelector = (state: AppState) => state.game.computerCandidate;

const gameResultSelector = (state: AppState) => state.game.result;

const gameWinnerCandidateSelector = (state: AppState) => {
  return CandidatesService.getWinnerCandidate(
    state.game.result,
    state.game.computerCandidate,
    state.game.betsWithGameResultDto,
  );
};

export {
  gameBalanceSelector,
  gameBetsSelector,
  gameTotalBetValueSelector,
  gameWinValueSelector,
  gameStatusSelector,
  gameComputerCandidateSelector,
  gamePlayerCandidateSelector,
  gameResultSelector,
  gameWinnerCandidateSelector,
};
