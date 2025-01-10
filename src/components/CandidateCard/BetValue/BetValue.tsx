import { FC } from 'react';

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

  return <span className={s.wrapper}>{value}</span>;
};

export { BetValue };
