import { useMemo } from 'react';

import { GAME_CONFIG } from '@/config/gameConfig';
import { GAME_CANDIDATES } from '@/constants/gameCandidates';
import { GAME_STATUS } from '@/constants/gameStatus';
import { useAppSelector } from '@/hooks/useAppSelector';

import {
  gameBalanceSelector,
  gameBetsSelector,
  gameStatusSelector,
} from '@/store/selectors/gameSelectors';

import { BetService } from '@/services/BetService';

const useAllowedToBetCandidates = () => {
  const bets = useAppSelector(gameBetsSelector);
  const balance = useAppSelector(gameBalanceSelector);
  const gameStatus = useAppSelector(gameStatusSelector);

  return useMemo(() => {
    if (GAME_STATUS.IN_PROGRESS === gameStatus || GAME_STATUS.FINISHED === gameStatus) {
      return [];
    }

    if (BetService.calculateTotalBetValue(bets) >= balance) {
      return [];
    }

    const candidatesWithBets = BetService.getBetsWithValues(bets);

    if (candidatesWithBets.length === GAME_CONFIG.maximumSimultaneousCandidates) {
      return candidatesWithBets.map((element) => element.candidate);
    }

    return [GAME_CANDIDATES.ROCK, GAME_CANDIDATES.PAPER, GAME_CANDIDATES.SCISSORS];
  }, [balance, bets, gameStatus]);
};

export { useAllowedToBetCandidates };
