import { GAME_CONFIG } from '@/config/gameConfig';
import { GameCandidate } from '@/constants/gameCandidates';
import { GameResult } from '@/constants/gameResult';

import { CandidatesService } from '@/services/CandidatesService';
import { BetDto } from '@/services/dtos/bet';
import { BetWithGameResultDto } from '@/services/dtos/betWithGameResult';

class BetService {
  public static calculateTotalBetValue(bets: Array<{ value: number }>): number {
    return bets.reduce((prev, item) => {
      return prev + item.value;
    }, 0);
  }

  public static calculateTotalBetByGameResult(
    bets: Array<BetWithGameResultDto>,
    gameResult: GameResult,
  ): number {
    return bets.reduce((prev, item) => {
      if (item.result === gameResult) {
        return prev + item.value;
      }

      return prev;
    }, 0);
  }

  public static getBetsWithValues(bets: Array<BetDto>): Array<BetDto> {
    return [...bets].filter((candidate) => candidate.value > 0);
  }

  public static isAllowedToPlaceBet(
    bets: Array<BetDto>,
    balance: number,
    candidate: GameCandidate,
  ): boolean {
    const betsWithValues = this.getBetsWithValues(bets);

    const totalBetAmount = this.calculateTotalBetValue(betsWithValues);

    const betValue = totalBetAmount + GAME_CONFIG.betValue;

    if (betValue > GAME_CONFIG.maximumBetValue) {
      return false;
    }

    if (betValue > balance) {
      return false;
    }

    const hasCandidate = betsWithValues.find((item) => item.candidate === candidate);

    if (hasCandidate) {
      return true;
    }

    return betsWithValues.length < GAME_CONFIG.maximumSimultaneousCandidates;
  }

  public static calculateBetsWithGameResults(
    bets: Array<BetDto>,
    computerCandidate: GameCandidate,
  ): Array<BetWithGameResultDto> {
    const userCandidates = this.getBetsWithValues(bets);

    return userCandidates.map((userCandidate) => {
      return {
        result: CandidatesService.compareCandidates(userCandidate.candidate, computerCandidate),
        value: userCandidate.value,
        candidate: userCandidate.candidate,
      };
    });
  }
}

export { BetService };
