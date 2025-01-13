import { CandidatesList } from '@/components/CandidatesList/CandidatesList';
import { GameCta } from '@/components/GameCta/GameCta';
import { GameOutline } from '@/components/GameOutline/GameOutline';
import { PagePreloader } from '@/components/PagePreloader/PagePreloader';

const Home = () => {
  return (
    <>
      <PagePreloader />
      <GameOutline />
      <CandidatesList />
      <GameCta />
    </>
  );
};

export { Home };
