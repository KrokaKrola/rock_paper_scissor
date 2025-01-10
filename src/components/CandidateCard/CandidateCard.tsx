import { FC } from 'react';

import { GameCandidate } from '@/config/game';
import clsx from 'clsx';

import { BetValue } from '@/components/CandidateCard/BetValue/BetValue';

import s from './CandidateCard.module.scss';

interface CandidateCardProps {
  candidate: GameCandidate;
  disabled?: boolean;
  onClick?: (candidate: GameCandidate) => void;
  betValue?: number;
}

const CandidateCard: FC<CandidateCardProps> = ({ candidate, betValue, onClick, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={clsx(s.wrapper, s[candidate], { [s.disabled]: disabled })}
    onClick={() => onClick?.(candidate)}
  >
    <BetValue value={betValue} />
    <span className={s.label}>{candidate}</span>
  </button>
);

export { CandidateCard };
