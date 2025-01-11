import { GameCandidate } from '@/constants/gameCandidates';

export interface BetDto {
  candidate: GameCandidate;
  value: number;
}
