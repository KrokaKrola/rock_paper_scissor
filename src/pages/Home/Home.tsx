import { CandidatesList } from '@/components/CandidatesList/CandidatesList';
import { GameCta } from '@/components/GameCta/GameCta';
import { GameOutline } from '@/components/GameOutline/GameOutline';

const Home = () => {
  return (
    <>
      <GameOutline />
      <CandidatesList />
      <GameCta />
    </>
  );
};

export { Home };
