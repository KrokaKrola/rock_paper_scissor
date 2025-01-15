import { FC, PropsWithChildren, ReactNode } from 'react';

import { GAME_RESULT } from '@/constants/gameResult';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameResultSound } from '@/hooks/useGameResultSound';
import { useGameStatus } from '@/hooks/useGameStatus';
import clsx from 'clsx';

import { FadeInOut } from '@/components/FadeInOut/FadeInOut';
import { FixedPointNumber } from '@/components/FixedPointNumber/FixedPointNumber';
import RollingPicker from '@/components/RollingPickerOptions/RollingPickerOptions';

import {
  gameComputerCandidateSelector,
  gamePlayerCandidateSelector,
  gameResultSelector,
  gameWinValueSelector,
} from '@/store/selectors/gameSelectors';

import { CandidatesService } from '@/services/CandidatesService';

import s from './GameOutline.module.scss';

const Outline: FC<PropsWithChildren<{ title?: ReactNode; className?: string; id: string }>> = ({
  className,
  title,
  children,
  id,
}) => (
  <FadeInOut key={id}>
    <div className={s.wrapper} data-testid={id}>
      {title && <h2 className={clsx('h2', className)}>{title}</h2>}
      {children}
    </div>
  </FadeInOut>
);

const GameOutline = () => {
  const playerCandidate = useAppSelector(gamePlayerCandidateSelector);
  const computerCandidate = useAppSelector(gameComputerCandidateSelector);
  const gameResult = useAppSelector(gameResultSelector);
  const playerWin = useAppSelector(gameWinValueSelector);

  const { inProgress, finished } = useGameStatus();

  useGameResultSound();

  if (inProgress && computerCandidate) {
    return (
      <Outline
        title={
          <>
            <div className={s.candidateName}>{playerCandidate}</div>
            <span className={s.versusLabel}>vs</span>
            <div className={s.candidateName}>
              <RollingPicker
                options={CandidatesService.getGameCandidates()}
                picked={computerCandidate}
              />
            </div>
          </>
        }
        id="in-progress-outline"
        className={s.candidatesLine}
      />
    );
  }

  if (finished && gameResult === GAME_RESULT.WIN && playerCandidate) {
    return (
      <Outline
        title={`${playerCandidate} WIN`}
        className={clsx(s.winLine, s[playerCandidate])}
        id="player-win-outline"
      >
        <h4 className={clsx('h4', s.playerWinLine)}>
          PLAYER WON: <FixedPointNumber number={playerWin} precision={2} />
        </h4>
      </Outline>
    );
  }

  if (finished && gameResult === GAME_RESULT.TIE) {
    return <Outline title="TIE" className={s.tieLine} id="tie-outline" />;
  }

  if (finished && gameResult === GAME_RESULT.LOSS && computerCandidate) {
    return (
      <Outline
        title={`${computerCandidate} WIN`}
        className={s[computerCandidate]}
        id="computer-win-outline"
      >
        <h4 className="h4">COMPUTER WON</h4>
      </Outline>
    );
  }

  return (
    <Outline id="initial-outline">
      <h4 className={clsx('h4', s.pickPositionsCta)}>Pick your positions</h4>
    </Outline>
  );
};

export { GameOutline };
