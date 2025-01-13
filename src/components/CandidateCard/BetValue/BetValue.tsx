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
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={clsx(s.wrapper, {
            [s.medium]: value.toString().length >= 4 && value.toString().length < 6,
          })}
        >
          {value}
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export { BetValue };
