import { GAME_CONFIG } from '@/config/gameConfig';
import { GAME_RESULT, GameResult } from '@/constants/gameResult';

import { BetService } from '@/services/BetService';
import { BetWithGameResultDto } from '@/services/dtos/betWithGameResult';

class GameService {
  public static calculateNewBalance(win: number, bets: Array<BetWithGameResultDto>): number {
    if (bets.length === 1) {
      return win;
    }

    return win - BetService.calculateTotalBetByGameResult(bets, GAME_RESULT.TIE);
  }

  public static calculateWinValue(betsWithGameResults: Array<BetWithGameResultDto>): number {
    let betValue: number;

    if (betsWithGameResults.length === 1) {
      betValue = BetService.calculateTotalBetValue(betsWithGameResults);
    } else {
      betValue = BetService.calculateTotalBetByGameResult(betsWithGameResults, GAME_RESULT.WIN);
    }

    const multiplier = GAME_CONFIG.winningRates[betsWithGameResults.length];

    return betValue * multiplier;
  }

  public static getCompletedGameResult(
    betsWithGameResults: Array<BetWithGameResultDto>,
  ): GameResult {
    if (betsWithGameResults.length === 1) {
      return betsWithGameResults[0].result;
    }

    const hasWins = betsWithGameResults.some((result) => result.result === GAME_RESULT.WIN);

    if (hasWins) {
      return GAME_RESULT.WIN;
    }

    return GAME_RESULT.LOSS;
  }
}

export { GameService };
