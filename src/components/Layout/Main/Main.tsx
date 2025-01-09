import { FC, PropsWithChildren } from 'react';

import s from './Main.module.scss';

const Main: FC<PropsWithChildren> = ({ children }) => <main className={s.wrapper}>{children}</main>;

export { Main };
