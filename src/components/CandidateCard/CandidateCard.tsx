import { FC } from 'react';

import { GameCandidate } from '@/constants/gameCandidates';
import { PropsWithTestId } from '@/types/utils';
import clsx from 'clsx';
import { motion } from 'motion/react';

import { BetValue } from '@/components/CandidateCard/BetValue/BetValue';

import s from './CandidateCard.module.scss';

interface CandidateCardProps {
  candidate: GameCandidate;
  disabled?: boolean;
  onClick: (candidate: GameCandidate) => void;
  betValue: number;
  isWinner?: boolean;
}

const CandidateCard: FC<PropsWithTestId<CandidateCardProps>> = ({
  candidate,
  betValue,
  onClick,
  disabled,
  isWinner,
  testId,
}) => {
  const handleClick = () => {
    onClick(candidate);
  };

  return (
    <motion.button
      type="button"
      disabled={disabled}
      className={clsx(s.wrapper, s[candidate], { [s.disabled]: disabled, [s.winner]: isWinner })}
      onClick={handleClick}
      data-testid={testId}
      whileTap={{ scale: 1.07, opacity: 1 }}
    >
      <BetValue value={betValue} />
      <span className={s.label}>{candidate}</span>
    </motion.button>
  );
};

export { CandidateCard };
