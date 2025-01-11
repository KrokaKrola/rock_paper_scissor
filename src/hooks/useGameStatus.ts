import { GAME_STATUS } from '@/constants/gameStatus';
import { useAppSelector } from '@/hooks/useAppSelector';

import { gameStatusSelector } from '@/store/selectors/gameSelectors';

const useGameStatus = () => {
  const gameStatus = useAppSelector(gameStatusSelector);

  return {
    inProgress: gameStatus === GAME_STATUS.IN_PROGRESS,
    finished: gameStatus === GAME_STATUS.FINISHED,
    waitingForBets: gameStatus === GAME_STATUS.WAITING_FOR_BETS,
  };
};

export { useGameStatus };
