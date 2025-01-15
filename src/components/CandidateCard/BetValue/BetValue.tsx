import { FC } from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

import { FixedPointNumber } from '@/components/FixedPointNumber/FixedPointNumber';

import s from './BetValue.module.scss';

interface BetValueProps {
  value?: number;
}

const BetValue: FC<BetValueProps> = ({ value }) => {
  const valueLength = value?.toString().length;

  return (
    <AnimatePresence>
      {!!value && value > 0 && (
        <motion.span
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={clsx(s.wrapper, {
            [s.medium]: valueLength && valueLength >= 4 && valueLength < 6,
            [s.small]: valueLength && valueLength >= 6,
          })}
        >
          <FixedPointNumber number={value} precision={2} />
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export { BetValue };
