import { FC } from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';

import s from './BetValue.module.scss';

interface BetValueProps {
  value?: number;
}

const BetValue: FC<BetValueProps> = ({ value }) => {
  return (
    <AnimatePresence>
      {!!value && value > 0 && (
        <motion.span
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.7, translateY: 5 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={clsx(s.wrapper, {
            [s.medium]: value.toString().length >= 4 && value.toString().length < 6,
            // [s.small]: valueLength >= 6,
          })}
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export { BetValue };
