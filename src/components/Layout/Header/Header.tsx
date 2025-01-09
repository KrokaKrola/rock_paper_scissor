import s from './Header.module.scss';

const Header = () => (
  <header className={s.wrapper}>
    <p className={s.element}>
      BALANCE: <span>5000</span>
    </p>
    <p className={s.element}>
      BET: <span>0</span>
    </p>
    <p className={s.element}>
      WIN: <span>0</span>
    </p>
  </header>
);

export { Header };
