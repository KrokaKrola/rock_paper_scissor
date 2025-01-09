import { GAME_CONFIG } from '@/config/game';

import s from '@/pages/Home/Home.module.scss';

import { CandidateCard } from '@/components/CandidateCard/CandidateCard';

const gameCandidates = Object.keys(GAME_CONFIG.gameCandidates);

const CandidatesList = () => (
  <div className={s.gameCandidates}>
    {gameCandidates.map((gameCandidate) => (
      <CandidateCard candidateName={gameCandidate} key={gameCandidate} />
    ))}
  </div>
);

export { CandidatesList };
