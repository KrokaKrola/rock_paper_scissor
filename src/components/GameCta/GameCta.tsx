import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameControls } from '@/hooks/useGameControls';
import { useGameStatus } from '@/hooks/useGameStatus';

import { Button } from '@/components/Button/Button';

import { gameTotalBetValueSelector } from '@/store/selectors/gameSelectors';

import s from './GameCta.module.scss';

const GameCta = () => {
  const gameTotalBet = useAppSelector(gameTotalBetValueSelector);

  const { finished, inProgress, waitingForBets } = useGameStatus();

  const { handleCancelBets, handleStartGame, handleResetGame } = useGameControls();

  if (finished) {
    return (
      <div className={s.wrapper}>
        <Button testId="reset-game" type="button" onClick={handleResetGame} withAnimation>
          Reset
        </Button>
        <div className={s.btnPlaceholder} />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <Button
        testId="play-game"
        type="button"
        disabled={gameTotalBet === 0 || inProgress}
        withAnimation
        onClick={handleStartGame}
      >
        Play
      </Button>
      <div className={s.btnPlaceholder}>
        {gameTotalBet > 0 && waitingForBets && (
          <Button testId="cancel-bet" type="button" withAnimation onClick={handleCancelBets}>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
};

export { GameCta };
