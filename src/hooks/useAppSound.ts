import { useMemo } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import useSound from 'use-sound';

import { appIsVolumeEnabledSelector } from '@/store/selectors/appSelectors';

const useAppSound = () => {
  const isVolumeEnabled = useAppSelector(appIsVolumeEnabledSelector);

  const soundOptions = {
    soundEnabled: isVolumeEnabled,
  };

  const [playChipSound] = useSound('/sounds/chip.mp3', soundOptions);
  const [playLoseSound] = useSound('/sounds/lose.mp3', soundOptions);
  const [playWinSound] = useSound('/sounds/win.mp3', soundOptions);
  const [playTieSound] = useSound('/sounds/tie.mp3', soundOptions);
  const [playGameInProgressSound, { stop: stopGameInProgressSound }] = useSound(
    '/sounds/game-in-progress-sound.mp3',
    soundOptions,
  );
  const [playPayoutSound] = useSound('/sounds/payout.mp3', soundOptions);
  const [playCancelBetSound] = useSound('/sounds/cancel-bet.mp3', soundOptions);

  return useMemo(
    () => ({
      chipSound: {
        play: playChipSound,
      },
      loseSound: {
        play: playLoseSound,
      },
      winSound: {
        play: playWinSound,
      },
      tieSound: {
        play: playTieSound,
      },
      gameInProgressSound: {
        play: playGameInProgressSound,
        stop: stopGameInProgressSound,
      },
      payoutSound: {
        play: playPayoutSound,
      },
      cancelBetSound: {
        play: playCancelBetSound,
      },
    }),
    [
      playCancelBetSound,
      playChipSound,
      playGameInProgressSound,
      playLoseSound,
      playPayoutSound,
      playTieSound,
      playWinSound,
      stopGameInProgressSound,
    ],
  );
};

export { useAppSound };
