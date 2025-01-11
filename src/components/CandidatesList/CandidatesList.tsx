import { GameCandidate } from '@/config/game';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import s from '@/pages/Home/Home.module.scss';

import { CandidateCard } from '@/components/CandidateCard/CandidateCard';

import { gameBetsSelector } from '@/store/selectors/gameSelectors';
import { gameSliceActions } from '@/store/slices/gameSlice';

const CandidatesList = () => {
  const dispatch = useAppDispatch();

  const bets = useAppSelector(gameBetsSelector);

  const handleCandidateCardClick = (candidate: GameCandidate) => {
    dispatch(gameSliceActions.handleAddBet(candidate));
  };

  return (
    <div className={s.gameCandidates}>
      {bets.map((bet) => (
        <CandidateCard
          candidate={bet.candidate}
          betValue={bet.value}
          key={bet.candidate}
          onClick={handleCandidateCardClick}
        />
      ))}
    </div>
  );
};

export { CandidatesList };
