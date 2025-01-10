import { GAME_STATUS } from '@/constants/gameStatus';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import clsx from 'clsx';

import { Button } from '@/components/Button/Button';
import { CandidatesList } from '@/components/CandidatesList/CandidatesList';

import {
  gameBetsSelector,
  gameStatusSelector,
  gameTotalBetValueSelector,
} from '@/store/selectors/gameSelectors';
import { gameSliceActions } from '@/store/slices/gameSlice';

import { GameService } from '@/services/GameService';

import s from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();
  const gameTotalBet = useAppSelector(gameTotalBetValueSelector);

  const userBets = useAppSelector(gameBetsSelector);

  const gameStatus = useAppSelector(gameStatusSelector);

  const handlePlayClick = () => {
    const computerCandidate = 'ROCK';

    const gameResult = GameService.determineGameResult(userBets, computerCandidate);

    dispatch(gameSliceActions.handleGameStatus(GAME_STATUS.IN_PROGRESS));

    setTimeout(() => {
      dispatch(
        gameSliceActions.handleFinishGame({
          gameResult,
        }),
      );
    }, 10);
  };

  const handleGameReset = () => {
    dispatch(gameSliceActions.handleResetGame());
  };

  const isGameInProcess = gameStatus === GAME_STATUS.IN_PROGRESS;

  const isGameFinished = gameStatus === GAME_STATUS.FINISHED;

  return (
    <>
      <h2 className={clsx('h4', s.header)}>Pick your positions</h2>
      <CandidatesList />
      {isGameFinished ? (
        <Button type="button" onClick={handleGameReset}>
          Reset
        </Button>
      ) : (
        <Button
          type="button"
          disabled={gameTotalBet === 0 || isGameInProcess}
          onClick={handlePlayClick}
        >
          Play
        </Button>
      )}
    </>
  );
};

export { Home };
