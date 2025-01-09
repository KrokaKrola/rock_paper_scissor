import clsx from 'clsx';

import { Button } from '@/components/Button/Button';
import { CandidatesList } from '@/components/CandidatesList/CandidatesList';
import { Header } from '@/components/Layout/Header/Header';
import { Main } from '@/components/Layout/Main/Main';

import s from './Home.module.scss';

const Home = () => (
  <>
    <Header />
    <Main>
      <h2 className={clsx('h4', s.header)}>Pick your positions</h2>
      <CandidatesList />
      <Button type="button">Play</Button>
    </Main>
  </>
);

export { Home };
