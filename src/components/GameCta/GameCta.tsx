import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameStatus } from '@/hooks/useGameStatus';

import { Button } from '@/components/Button/Button';

import { gameTotalBetValueSelector } from '@/store/selectors/gameSelectors';
import { gameSliceActions } from '@/store/slices/gameSlice';

const GameCta = () => {
  const { finished, waitingForBets, inProgress } = useGameStatus();
  const dispatch = useAppDispatch();
  const gameTotalBet = useAppSelector(gameTotalBetValueSelector);

  const handleGameReset = () => {
    dispatch(gameSliceActions.handleResetGame());
  };

  const handlePlayClick = () => {
    dispatch(gameSliceActions.handleGameStart());

    // setTimeout(() => {
    //   dispatch(gameSliceActions.handleFinishGame());
    // }, 3200);
  };

  const handleCancelBets = () => {
    dispatch(gameSliceActions.handleCancelBets());
  };

  if (finished) {
    return (
      <Button testId="reset-game" type="button" onClick={handleGameReset}>
        Reset
      </Button>
    );
  }

  if (waitingForBets && gameTotalBet > 0) {
    return (
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Button testId="cancel-game" type="button" onClick={handleCancelBets}>
          Cancel
        </Button>
        <Button data-testid="play-game" type="button" onClick={handlePlayClick}>
          Play
        </Button>
      </div>
    );
  }

  return (
    <Button data-testid="play-game" type="button" disabled={gameTotalBet === 0 || inProgress}>
      Play
    </Button>
  );
};

export { GameCta };
