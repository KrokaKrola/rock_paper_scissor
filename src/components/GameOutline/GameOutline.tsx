import { FC, PropsWithChildren, ReactNode } from 'react';

import { GAME_RESULT } from '@/constants/gameResult';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGameStatus } from '@/hooks/useGameStatus';
import clsx from 'clsx';

import {
  gameComputerCandidateSelector,
  gamePlayerCandidateSelector,
  gameResultSelector,
  gameWinValueSelector,
} from '@/store/selectors/gameSelectors';

import s from './GameOutline.module.scss';

const Outline: FC<PropsWithChildren<{ title?: ReactNode; className?: string }>> = ({
  className,
  title,
  children,
}) => {
  return (
    <div className={s.wrapper}>
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

  if (inProgress) {
    return (
      <Outline
        title={
          <>
            {playerCandidate}
            <span>vs</span>
            {computerCandidate}
          </>
        }
        className={s.candidatesLine}
      />
    );
  }

  if (finished && gameResult === GAME_RESULT.WIN && playerCandidate) {
    return (
      <Outline title={`${playerCandidate} WIN`} className={clsx(s.winLine, s[playerCandidate])}>
        <h4 className={clsx('h4', s.playerWinLine)}>PLAYER WIN: {playerWin}</h4>
      </Outline>
    );
  }

  if (finished && gameResult === GAME_RESULT.TIE) {
    return <Outline title="TIE" className={s.tieLine} />;
  }

  if (finished && gameResult === GAME_RESULT.LOSS && computerCandidate) {
    return (
      <Outline title={`${computerCandidate} WIN`} className={s[computerCandidate]}>
        <h4 className="h4">COMPUTER WIN</h4>
      </Outline>
    );
  }

  return (
    <Outline>
      <h4 className={clsx('h4', s.pickPositionsCta)}>Pick your positions</h4>
    </Outline>
  );
};

export { GameOutline };
