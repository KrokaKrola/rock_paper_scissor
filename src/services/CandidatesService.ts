import { GAME_CONFIG } from '@/config/gameConfig';
import { GAME_CANDIDATES, GameCandidate } from '@/constants/gameCandidates';
import { GAME_RESULT, GameResult } from '@/constants/gameResult';
import { Nullable } from '@/types/utils';
import { getRandomInt } from '@/utils/numbers/getRandomInteger';

import { BetWithGameResultDto } from '@/services/dtos/betWithGameResult';

class CandidatesService {
  public static getGameCandidates(): Array<GameCandidate> {
    return Object.keys(GAME_CANDIDATES) as Array<GameCandidate>;
  }

  public static getPlayerCandidate(
    betsWithGameResults: Array<BetWithGameResultDto>,
  ): Nullable<GameCandidate> {
    if (betsWithGameResults.length === 1) {
      return betsWithGameResults[0].candidate;
    }

    const winCandidate = betsWithGameResults.find(
      (candidate) => candidate.result === GAME_RESULT.WIN,
    );

    if (winCandidate) {
      return winCandidate.candidate;
    }

    const lossCandidate = betsWithGameResults.find(
      (candidate) => candidate.result === GAME_RESULT.LOSS,
    );

    if (lossCandidate) {
      return lossCandidate.candidate;
    }

    return null;
  }

  public static compareCandidates(
    userCandidate: GameCandidate,
    computerCandidate: GameCandidate,
  ): GameResult {
    if (userCandidate === computerCandidate) {
      return GAME_RESULT.TIE;
    }

    const winners = GAME_CONFIG.gameCandidatesWinningMap[userCandidate];

    if (winners.includes(computerCandidate)) {
      return GAME_RESULT.WIN;
    }

    return GAME_RESULT.LOSS;
  }

  public static generateComputerCandidate(): GameCandidate {
    const candidates = this.getGameCandidates();
    const randomCandidate = getRandomInt(0, candidates.length - 1);

    return candidates[randomCandidate];
  }

  static getWinnerCandidate(
    result: Nullable<GameResult>,
    computerCandidate: Nullable<GameCandidate>,
    betsWithGameResultDto: Array<BetWithGameResultDto>,
  ): Nullable<GameCandidate> {
    if (result === GAME_RESULT.TIE) {
      return null;
    }

    if (result === GAME_RESULT.LOSS) {
      return computerCandidate;
    }

    const winResult = betsWithGameResultDto.find((item) => {
      return item.result === GAME_RESULT.WIN;
    });

    if (result === GAME_RESULT.WIN && winResult) {
      return winResult.candidate;
    }

    return null;
  }
}

export { CandidatesService };
