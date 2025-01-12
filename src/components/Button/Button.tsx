import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import { PropsWithTestId } from '@/types/utils';
import clsx from 'clsx';

import s from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<PropsWithChildren<PropsWithTestId<ButtonProps>>> = ({
  children,
  testId,
  ...rest
}) => (
  <button {...rest} className={clsx(rest.className, s.wrapper)} data-testid={testId}>
    {children}
  </button>
);

export { Button };
