import { GameCandidate } from '@/config/game';

export interface BetDto {
  candidate: GameCandidate;
  value: number;
}
