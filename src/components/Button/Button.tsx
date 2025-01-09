import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

import clsx from 'clsx';

import s from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, ...rest }) => (
  <button {...rest} className={clsx(rest.className, s.wrapper)}>
    {children}
  </button>
);

export { Button };
