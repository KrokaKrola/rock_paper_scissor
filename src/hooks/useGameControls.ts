import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSound } from '@/hooks/useAppSound';

import { gameSliceActions } from '@/store/slices/gameSlice';

const ROLLING_PICKER_ANIMATION = 2500;
const IDLE_TIME = 700;
const ANIMATION_DURATION = ROLLING_PICKER_ANIMATION + IDLE_TIME;

const useGameControls = () => {
  const dispatch = useAppDispatch();

  const { gameInProgressSound, payoutSound, cancelBetSound } = useAppSound();

  const handleResetGame = () => {
    payoutSound.play();

    dispatch(gameSliceActions.handleResetGame());
  };

  const handleStartGame = () => {
    dispatch(gameSliceActions.handleGameStart());
    gameInProgressSound.play();

    setTimeout(() => {
      gameInProgressSound.stop();
      dispatch(gameSliceActions.handleFinishGame());
    }, ANIMATION_DURATION);
  };

  const handleCancelBets = () => {
    cancelBetSound.play();
    dispatch(gameSliceActions.handleCancelBets());
  };

  return {
    handleCancelBets,
    handleStartGame,
    handleResetGame,
  };
};

export { useGameControls };
