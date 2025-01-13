import { FC } from 'react';

import { CandidatesList } from '@/components/CandidatesList/CandidatesList';
import { GameCta } from '@/components/GameCta/GameCta';
import { GameOutline } from '@/components/GameOutline/GameOutline';
import { PagePreloader } from '@/components/PagePreloader/PagePreloader';

interface HomeProps {
  withPagePreloader?: boolean;
}

const Home: FC<HomeProps> = ({ withPagePreloader }) => {
  return (
    <>
      {withPagePreloader && <PagePreloader />}
      <GameOutline />
      <CandidatesList />
      <GameCta />
    </>
  );
};

export { Home };
