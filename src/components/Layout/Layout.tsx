import { Outlet } from 'react-router-dom';

import { Header } from '@/components/Layout/Header/Header';
import { Main } from '@/components/Layout/Main/Main';

const Layout = () => (
  <>
    <Header />
    <Main>
      <Outlet />
    </Main>
  </>
);

export { Layout };
