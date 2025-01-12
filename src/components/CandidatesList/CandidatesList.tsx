import { GameCandidate } from '@/constants/gameCandidates';
import { useAllowedToBetCandidates } from '@/hooks/useAllowedToBetCandidates';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import { CandidateCard } from '@/components/CandidateCard/CandidateCard';

import { gameBetsSelector, gameWinnerCandidateSelector } from '@/store/selectors/gameSelectors';
import { gameSliceActions } from '@/store/slices/gameSlice';

import s from './CandidatesList.module.scss';

const CandidatesList = () => {
  const dispatch = useAppDispatch();

  const bets = useAppSelector(gameBetsSelector);

  const allowedToBetCandidates = useAllowedToBetCandidates();

  const handleCandidateCardClick = (candidate: GameCandidate) => {
    dispatch(gameSliceActions.handleAddBet(candidate));
  };

  const gameWinnerCandidate = useAppSelector(gameWinnerCandidateSelector);

  return (
    <div className={s.wrapper}>
      {bets.map((bet) => (
        <CandidateCard
          candidate={bet.candidate}
          betValue={bet.value}
          key={bet.candidate}
          onClick={handleCandidateCardClick}
          isWinner={bet.candidate === gameWinnerCandidate}
          testId={`${bet.candidate}-card`}
          disabled={!allowedToBetCandidates.includes(bet.candidate)}
        />
      ))}
    </div>
  );
};

export { CandidatesList };
