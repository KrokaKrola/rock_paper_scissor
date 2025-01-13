import { FC, ReactNode } from 'react';

import { AnimatePresence, motion } from 'motion/react';

interface FadeInOutProps {
  children: ReactNode;
  duration?: number;
}

const FadeInOut: FC<FadeInOutProps> = ({ children, duration = 0.3 }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export { FadeInOut };
