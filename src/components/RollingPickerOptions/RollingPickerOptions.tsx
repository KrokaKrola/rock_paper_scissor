import { FC, useEffect, useState } from 'react';

import { GameCandidate } from '@/constants/gameCandidates';
import { motion, useAnimation } from 'framer-motion';

import s from './RollingPickerOptions.module.scss';

interface RollingPickerProps {
  options: GameCandidate[];
  picked: GameCandidate;
  itemHeight?: number;
}

const DEFAULT_ITEM_HEIGHT = 60;

const RollingPicker: FC<RollingPickerProps> = ({
  options,
  picked,
  itemHeight = DEFAULT_ITEM_HEIGHT,
}) => {
  const controls = useAnimation();
  const [extendedOptions, setExtendedOptions] = useState<string[]>([]);

  useEffect(() => {
    const repeatedOptions = [...Array(10).fill(options).flat()];
    const extendedList = [...repeatedOptions, picked, ...repeatedOptions];

    setExtendedOptions(extendedList);
  }, [options, picked]);

  useEffect(() => {
    if (extendedOptions.length > 0) {
      const winnerIndex = extendedOptions.lastIndexOf(picked);
      const stopPosition = -(winnerIndex - Math.floor(extendedOptions.length / 2)) * itemHeight;

      controls.start({
        y: stopPosition,
        transition: { duration: 2.5, ease: 'easeInOut' },
      });
    }
  }, [extendedOptions, picked, controls, itemHeight]);

  const heightValue = `${itemHeight}px`;

  return (
    <div
      className={s.wrapper}
      style={{
        height: heightValue,
      }}
    >
      <motion.div animate={controls} className={s.roller}>
        {extendedOptions.map((option, index) => (
          <div
            key={`${option}-${index}`}
            className={s.rollerItem}
            style={{
              height: heightValue,
              lineHeight: heightValue,
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
