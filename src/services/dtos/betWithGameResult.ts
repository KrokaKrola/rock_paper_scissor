import { GameResult } from '@/constants/gameResult';

import { BetDto } from '@/services/dtos/bet';

export interface BetWithGameResultDto extends BetDto {
  result: GameResult;
}
