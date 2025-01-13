import { ButtonHTMLAttributes, FC, MouseEvent, PropsWithChildren } from 'react';

import { PropsWithTestId } from '@/types/utils';
import clsx from 'clsx';
import { stagger } from 'motion';
import { motion, useAnimate } from 'motion/react';

import { FadeInOut } from '@/components/FadeInOut/FadeInOut';

import s from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  withAnimation?: boolean;
}

const Button: FC<PropsWithChildren<PropsWithTestId<ButtonProps>>> = ({
  children,
  withAnimation,
  testId,
  onClick,
  ...rest
}) => {
  const [scope, animate] = useAnimate();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    animate([
      ['.letter', { y: -50 }, { duration: 0.2, delay: stagger(0.05) }],
      ['button', { scale: 0.8 }, { duration: 0.1, at: '<' }],
      ['button', { scale: 1 }, { duration: 0.1 }],
      ['.letter', { y: 0 }, { duration: 0.00001, at: 0.5 }],
    ]);
  };

  if (withAnimation && typeof children === 'string') {
    return (
      <FadeInOut>
        <motion.div ref={scope}>
          <button
            {...rest}
            className={clsx(rest.className, s.wrapper)}
            data-testid={testId}
            onClick={handleClick}
          >
            <span className="visually-hidden">{children}</span>
            <span className={s.animationWrapper}>
              {children.split('').map((letter, index) => (
                <span
                  data-letter={letter}
                  className={clsx(s.letter, 'letter')}
                  key={`${letter}-${index}`}
                >
                  {letter}
                </span>
              ))}
            </span>
          </button>
        </motion.div>
      </FadeInOut>
    );
  }

  if (withAnimation) {
    console.warn(
      'Type of button children is not a string, so animation will not work on your button',
    );
  }

  return (
    <button
      {...rest}
      onClick={onClick}
      className={clsx(rest.className, s.wrapper)}
      data-testid={testId}
    >
      <span>{children}</span>
    </button>
  );
};

export { Button };
