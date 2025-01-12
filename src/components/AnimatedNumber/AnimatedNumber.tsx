import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { Transition, motion, useAnimation, useInView } from 'motion/react';

import s from './AnimatedNumber.module.scss';

const NUMBERS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
];

interface Props {
  className?: string;
  animateToNumber: number;
  transitions?: (index: number) => Transition;
}

const AnimatedNumber = ({ className, animateToNumber, transitions }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const controls = useAnimation();
  const animateToNumberString = String(Math.abs(animateToNumber));
  const animateToNumbersArr = Array.from(animateToNumberString, Number).map((x, idx) =>
    isNaN(x) ? animateToNumberString[idx] : x,
  );

  const [numberHeight, setNumberHeight] = useState(0);
  const [numberWidth, setNumberWidth] = useState(0);

  const numberDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rect = numberDivRef.current?.getClientRects()?.[0];
    if (rect) {
      setNumberHeight(rect.height);
      setNumberWidth(rect.width);
    }
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, animateToNumber, controls]);

  return (
    <span ref={ref}>
      {numberHeight !== 0 && (
        <div className={clsx(s.wrapper, className)}>
          {animateToNumbersArr.map((n, index) => {
            if (typeof n === 'string') {
              return (
                <div key={index} className={s.numeric}>
                  {n}
                </div>
              );
            }

            return (
              <motion.div
                key={`${n}_${index}`}
                style={{
                  height: numberHeight,
                  width: numberWidth,
                }}
                initial="hidden"
                variants={{
                  hidden: { y: 0 },
                  visible: {
                    y:
                      -1 *
                        (numberHeight *
                          (typeof animateToNumbersArr[index] === 'number'
                            ? animateToNumbersArr[index]
                            : 0)) -
                      numberHeight * 20,
                  },
                }}
                animate={controls}
                transition={transitions?.(index)}
              >
                {NUMBERS.map((number, index) => (
                  <div key={index} className={s.numeric}>
                    {number}
                  </div>
                ))}
              </motion.div>
            );
          })}
        </div>
      )}

      <div ref={numberDivRef} style={{ position: 'absolute', top: -1000 }}>
        {0}
      </div>
    </span>
  );
};

export { AnimatedNumber };
