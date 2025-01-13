import { AppState } from '@/store/store';

import { BetService } from '@/services/BetService';
import { CandidatesService } from '@/services/CandidatesService';

const gameBalanceSelector = ({ game }: AppState) => game.balance;

const gameBetsSelector = ({ game }: AppState) => game.bets;

const gameTotalBetValueSelector = ({ game }: AppState) =>
  BetService.calculateTotalBetValue(game.bets);

const gameWinValueSelector = ({ game }: AppState) => game.winValue;

const gameStatusSelector = ({ game }: AppState) => game.status;

const gamePlayerCandidateSelector = ({ game }: AppState) =>
  CandidatesService.getPlayerCandidate(game.betsWithGameResultDto);

const gameComputerCandidateSelector = ({ game }: AppState) => game.computerCandidate;

const gameResultSelector = ({ game }: AppState) => game.result;

const gameWinnerCandidateSelector = ({ game }: AppState) => {
  return CandidatesService.getWinnerCandidate(
    game.result,
    game.computerCandidate,
    game.betsWithGameResultDto,
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
