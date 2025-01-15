import { useMemo } from 'react';

import { AppConfig } from '@/config/AppConfig';
import { GAME_CANDIDATES } from '@/constants/gameCandidates';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameStatus } from '@/hooks/useGameStatus';

import { gameBalanceSelector, gameBetsSelector } from '@/store/selectors/gameSelectors';

import { BetService } from '@/services/BetService';

const useAllowedToBetCandidates = () => {
  const bets = useAppSelector(gameBetsSelector);
  const balance = useAppSelector(gameBalanceSelector);

  const { inProgress, finished } = useGameStatus();

  return useMemo(() => {
    if (inProgress || finished) {
      return [];
    }

    if (BetService.calculateTotalBetValue(bets) + AppConfig.betValue > balance) {
      return [];
    }

    const candidatesWithBets = BetService.getBetsWithValues(bets);

    if (candidatesWithBets.length === AppConfig.maximumSimultaneousCandidates) {
      return candidatesWithBets.map((element) => element.candidate);
    }

    return [GAME_CANDIDATES.ROCK, GAME_CANDIDATES.PAPER, GAME_CANDIDATES.SCISSORS];
  }, [balance, bets, finished, inProgress]);
};

export { useAllowedToBetCandidates };
