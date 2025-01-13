import { FC } from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { PropsWithTestId } from '@/types/utils';

import { AnimatedNumber } from '@/components/AnimatedNumber/AnimatedNumber';

import {
  gameBalanceSelector,
  gameTotalBetValueSelector,
  gameWinValueSelector,
} from '@/store/selectors/gameSelectors';

import s from './Header.module.scss';

const StatisticItem: FC<PropsWithTestId<{ label: string; value: number }>> = ({
  label,
  value,
  testId,
}) => {
  return (
    <div className={s.element}>
      {label}:{' '}
      <span data-testid={testId}>
        <AnimatedNumber animateToNumber={value} />
      </span>
    </div>
  );
};

const Header = () => {
  const gameBalance = useAppSelector(gameBalanceSelector);
  const betValue = useAppSelector(gameTotalBetValueSelector);
  const winValue = useAppSelector(gameWinValueSelector);

  return (
    <header className={s.wrapper}>
      <StatisticItem testId="balance" label="BALANCE" value={gameBalance - betValue} />
      <StatisticItem testId="bet" label="BET" value={betValue} />
      <StatisticItem testId="win" label="WIN" value={winValue} />
    </header>
  );
};

export { Header };
