import { useAppSelector } from '@/hooks/useAppSelector';

import {
  gameBalanceSelector,
  gameTotalBetValueSelector,
  gameWinValueSelector,
} from '@/store/selectors/gameSelectors';

import s from './Header.module.scss';

const Header = () => {
  const gameBalance = useAppSelector(gameBalanceSelector);

  const betValue = useAppSelector(gameTotalBetValueSelector);

  const winValue = useAppSelector(gameWinValueSelector);

  return (
    <header className={s.wrapper}>
      <p className={s.element}>
        BALANCE: <span>{gameBalance}</span>
      </p>
      <p className={s.element}>
        BET: <span>{betValue}</span>
      </p>
      <p className={s.element}>
        WIN: <span>{winValue}</span>
      </p>
    </header>
  );
};

export { Header };
