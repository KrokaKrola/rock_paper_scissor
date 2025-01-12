import { FC, PropsWithChildren, ReactNode } from 'react';

import { GAME_RESULT } from '@/constants/gameResult';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameStatus } from '@/hooks/useGameStatus';
import { PropsWithTestId } from '@/types/utils';
import clsx from 'clsx';

import RollingPicker from '@/components/RollingPickerOptions/RollingPickerOptions';

import {
  gameComputerCandidateSelector,
  gamePlayerCandidateSelector,
  gameResultSelector,
  gameWinValueSelector,
} from '@/store/selectors/gameSelectors';

import { CandidatesService } from '@/services/CandidatesService';

import s from './GameOutline.module.scss';

const Outline: FC<
  PropsWithChildren<PropsWithTestId<{ title?: ReactNode; className?: string }>>
> = ({ className, title, children, testId }) => {
  return (
    <div className={s.wrapper} data-testid={testId}>
      {title && <h2 className={clsx('h2', className)}>{title}</h2>}
      {children}
    </div>
  );
};

const GameOutline = () => {
  const { inProgress, finished } = useGameStatus();

  const playerCandidate = useAppSelector(gamePlayerCandidateSelector);
  const computerCandidate = useAppSelector(gameComputerCandidateSelector);
  const gameResult = useAppSelector(gameResultSelector);
  const playerWin = useAppSelector(gameWinValueSelector);

  if (inProgress && computerCandidate) {
    return (
      <Outline
        title={
          <>
            <div style={{ width: '230px' }}>{playerCandidate}</div>
            <span style={{ position: 'relative', top: -5 }}>vs</span>
            <RollingPicker
              options={CandidatesService.getGameCandidates()}
              picked={computerCandidate}
            />
          </>
        }
        testId="in-progress-outline"
        className={s.candidatesLine}
      />
    );
  }

  if (finished && gameResult === GAME_RESULT.WIN && playerCandidate) {
    return (
      <Outline
        title={`${playerCandidate} WIN`}
        className={clsx(s.winLine, s[playerCandidate])}
        testId="player-win-outline"
      >
        <h4 className={clsx('h4', s.playerWinLine)}>PLAYER WIN: {playerWin}</h4>
      </Outline>
    );
  }

  if (finished && gameResult === GAME_RESULT.TIE) {
    return <Outline title="TIE" className={s.tieLine} testId="tie-outline" />;
  }

  if (finished && gameResult === GAME_RESULT.LOSS && computerCandidate) {
    return (
      <Outline
        title={`${computerCandidate} WIN`}
        className={s[computerCandidate]}
        testId="computer-win-outline"
      >
        <h4 className="h4">COMPUTER WIN</h4>
      </Outline>
    );
  }

  return (
    <Outline testId="initial-outline">
      <h4 className={clsx('h4', s.pickPositionsCta)}>Pick your positions</h4>
    </Outline>
  );
};

export { GameOutline };
