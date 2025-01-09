import { FC } from 'react';

import clsx from 'clsx';

import { BetValue } from '@/components/CandidateCard/BetValue/BetValue';

import s from './CandidateCard.module.scss';

interface CandidateCardProps {
  candidateName: string;
  disabled?: boolean;
  onClick?: () => void;
  betValue?: number;
}

const CandidateCard: FC<CandidateCardProps> = ({ candidateName, betValue, onClick, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    className={clsx(s.wrapper, { [s.disabled]: disabled })}
    onClick={onClick}
  >
    {betValue && <BetValue value={betValue} />}
    <span className={s.label}>{candidateName}</span>
  </button>
);

export { CandidateCard };
