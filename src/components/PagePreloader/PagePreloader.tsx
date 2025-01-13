import { FC } from 'react';

import { motion } from 'motion/react';

import s from './PagePreloader.module.scss';

interface PagePreloaderProps {
  onComplete?: () => void;
}

const content = [
  { text: 'ROCK', from: 'top', className: s.primaryText },
  { text: 'vs', from: 'bottom', className: s.secondaryText },
  { text: 'PAPER', from: 'top', className: s.primaryText },
  { text: 'vs', from: 'bottom', className: s.secondaryText },
  { text: 'SCISSORS', from: 'top', className: s.primaryText },
] as const;

const PagePreloader: FC<PagePreloaderProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: '100%' }}
      transition={{
        duration: 1,
        delay: 2.3,
        ease: [0.42, 0, 0.58, 1],
      }}
      onAnimationComplete={onComplete}
      className={s.wrapper}
    >
      <h1 className="h1">
        {content.map((item, index) => (
          <motion.span
            className={item.className}
            key={index}
            initial={{
              y: item.from === 'top' ? '-100%' : '100%',
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.3,
              ease: 'easeInOut',
            }}
          >
            {item.text}
          </motion.span>
        ))}
      </h1>
    </motion.div>
  );
};

export { PagePreloader };
