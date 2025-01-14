import { useEffect } from 'react';

import { GAME_RESULT } from '@/constants/gameResult';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppSound } from '@/hooks/useAppSound';
import { useGameStatus } from '@/hooks/useGameStatus';

import { gameResultSelector } from '@/store/selectors/gameSelectors';

const useGameResultSound = () => {
  const { winSound, loseSound, tieSound } = useAppSound();

  const gameResult = useAppSelector(gameResultSelector);

  const { finished } = useGameStatus();

  useEffect(() => {
    if (!finished) {
      return;
    }

    if (gameResult === GAME_RESULT.WIN) {
      winSound.play();
    } else if (gameResult === GAME_RESULT.LOSS) {
      loseSound.play();
    } else if (gameResult === GAME_RESULT.TIE) {
      tieSound.play();
    }
  }, [gameResult, finished, winSound, loseSound, tieSound]);
};

export { useGameResultSound };
