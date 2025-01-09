import { FC } from 'react';

import s from './BetValue.module.scss';

interface BetValueProps {
  value: number;
}

const BetValue: FC<BetValueProps> = ({ value }) => <span className={s.wrapper}>{value}</span>;

export { BetValue };
