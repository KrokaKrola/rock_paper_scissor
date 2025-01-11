import { FC } from 'react';

import { GameCandidate } from '@/constants/gameCandidates';
import clsx from 'clsx';

import { BetValue } from '@/components/CandidateCard/BetValue/BetValue';

import s from './CandidateCard.module.scss';

interface CandidateCardProps {
  candidate: GameCandidate;
  disabled?: boolean;
  onClick?: (candidate: GameCandidate) => void;
  betValue?: number;
  isWinner?: boolean;
}

const CandidateCard: FC<CandidateCardProps> = ({
  candidate,
  betValue,
  onClick,
  disabled,
  isWinner,
}) => {
  const handleClick = () => {
    onClick?.(candidate);
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(s.wrapper, s[candidate], { [s.disabled]: disabled, [s.winner]: isWinner })}
      onClick={handleClick}
    >
      <BetValue value={betValue} />
      <span className={s.label}>{candidate}</span>
    </button>
  );
};

export { CandidateCard };
