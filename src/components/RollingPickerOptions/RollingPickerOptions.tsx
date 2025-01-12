import { FC, useEffect, useState } from 'react';

import { GameCandidate } from '@/constants/gameCandidates';
import { motion, useAnimation } from 'framer-motion';

import s from './RollingPickerOptions.module.scss';

interface RollingPickerProps {
  options: GameCandidate[];
  picked: GameCandidate;
}

const RollingPicker: FC<RollingPickerProps> = ({ options, picked }) => {
  const controls = useAnimation();
  const [extendedOptions, setExtendedOptions] = useState<string[]>([]);
  const ITEM_HEIGHT = 50;

  useEffect(() => {
    const repeatedOptions = [...Array(10).fill(options).flat()];
    const extendedList = [...repeatedOptions, picked, ...repeatedOptions];
    setExtendedOptions(extendedList);
  }, [options, picked]);

  useEffect(() => {
    if (extendedOptions.length > 0) {
      const winnerIndex = extendedOptions.lastIndexOf(picked);
      const stopPosition = -(winnerIndex - Math.floor(extendedOptions.length / 2)) * ITEM_HEIGHT;

      controls.start({
        y: stopPosition,
        transition: { duration: 2.5, ease: 'easeInOut' },
      });
    }
  }, [extendedOptions, picked, controls]);

  return (
    <div
      className={s.wrapper}
      style={{
        overflow: 'hidden',
        height: `${ITEM_HEIGHT}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: '230px',
      }}
    >
      <motion.div
        animate={controls}
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
        }}
      >
        {extendedOptions.map((option, index) => (
          <div
            key={`${option}-${index}`}
            style={{
              height: `${ITEM_HEIGHT}px`,
              textAlign: 'center',
              lineHeight: `${ITEM_HEIGHT}px`,
              fontSize: '40px',
            }}
          >
            {option}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default RollingPicker;
