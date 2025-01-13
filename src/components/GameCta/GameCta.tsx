import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameStatus } from '@/hooks/useGameStatus';

import { Button } from '@/components/Button/Button';

import { gameTotalBetValueSelector } from '@/store/selectors/gameSelectors';
import { gameSliceActions } from '@/store/slices/gameSlice';

const ROLLING_PICKER_ANIMATION = 2500;
const IDLE_TIME = 700;
const ANIMATION_DURATION = ROLLING_PICKER_ANIMATION + IDLE_TIME;

const GameCta = () => {
  const dispatch = useAppDispatch();

  const gameTotalBet = useAppSelector(gameTotalBetValueSelector);

  const { finished, inProgress } = useGameStatus();

  const handleGameReset = () => {
    dispatch(gameSliceActions.handleResetGame());
  };

  const handlePlayClick = () => {
    dispatch(gameSliceActions.handleGameStart());

    setTimeout(() => {
      dispatch(gameSliceActions.handleFinishGame());
    }, ANIMATION_DURATION);
  };

  if (finished) {
    return (
      <Button testId="reset-game" type="button" onClick={handleGameReset} withAnimation>
        Reset
      </Button>
    );
  }

  return (
    <Button
      data-testid="play-game"
      type="button"
      disabled={gameTotalBet === 0 || inProgress}
      withAnimation
      onClick={handlePlayClick}
    >
      Play
    </Button>
  );
};

export { GameCta };
