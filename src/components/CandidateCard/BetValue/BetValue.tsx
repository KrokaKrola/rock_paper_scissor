import { FC } from 'react';

import clsx from 'clsx';

import s from './BetValue.module.scss';

interface BetValueProps {
  value?: number;
}

const BetValue: FC<BetValueProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  if (value === 0) {
    return null;
  }

  const valueLength = value.toString().length;

  return (
    <span
      className={clsx(s.wrapper, {
        [s.medium]: valueLength >= 4 && valueLength < 6,
        [s.small]: valueLength >= 6,
      })}
    >
      {value}
    </span>
  );
};

export { BetValue };
