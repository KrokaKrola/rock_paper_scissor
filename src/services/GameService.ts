import { GAME_CONFIG, GameCandidate } from '@/config/game';
import { GAME_RESULT, GameResult } from '@/constants/gameResult';
import { getRandomInt } from '@/utils/numbers/getRandomInteger';

class GameService {
  private static gameCandidates = GAME_CONFIG.gameCandidates;

  public static getGameCandidates(): Array<GameCandidate> {
    return Object.keys(this.gameCandidates) as Array<GameCandidate>;
  }

  public static calculateTotalBetValue(elements: Array<{ betValue: number }>): number {
    return elements.reduce((prev, item) => {
      return prev + item.betValue;
    }, 0);
  }

  public static calculateTotalBetWithWinConditions(
    elements: Array<{ betValue: number; result: GameResult }>,
  ): number {
    return elements.reduce((prev, item) => {
      if (item.result === GAME_RESULT.WIN) {
        return prev + item.betValue;
      }

      return prev;
    }, 0);
  }

  public static getCandidatesWithBets(
    bets: Array<{ betValue: number; candidate: GameCandidate }>,
  ): Array<{ betValue: number; candidate: GameCandidate }> {
    return [...bets].filter((candidate) => candidate.betValue > 0);
  }

  public static isAllowedToPlaceBet(
    bets: Array<{ candidate: GameCandidate; betValue: number }>,
    balance: number,
    candidate: GameCandidate,
  ): boolean {
    const candidates = this.getCandidatesWithBets(bets);

    const totalBetAmount = this.calculateTotalBetValue(candidates);

    if (totalBetAmount + GAME_CONFIG.betValue > balance) {
      return false;
    }

    const hasCandidate = candidates.find((item) => item.candidate === candidate);

    if (hasCandidate) {
      return true;
    }

    return candidates.length < GAME_CONFIG.maximumSimultaneousCandidates;
  }

  public static generateComputerCandidate(): GameCandidate {
    const candidates = this.getGameCandidates();
    const randomCandidate = getRandomInt(0, candidates.length - 1);

    return candidates[randomCandidate];
  }

  public static determineGameResult(
    userBets: Array<{ candidate: GameCandidate; betValue: number }>,
    computerCandidate: GameCandidate,
  ): Array<{ betValue: number; result: GameResult; candidate: GameCandidate }> {
    const userCandidates = this.getCandidatesWithBets(userBets);

    return userCandidates.map((userCandidate) => {
      return {
        result: this.compareCandidates(userCandidate.candidate, computerCandidate),
        betValue: userCandidate.betValue,
        candidate: userCandidate.candidate,
      };
    });
  }

  private static compareCandidates(
    userCandidate: GameCandidate,
    computerCandidate: GameCandidate,
  ): GameResult {
    if (userCandidate === computerCandidate) {
      return GAME_RESULT.TIE;
    }

    const winners = this.gameCandidates[userCandidate];

    if (winners.includes(computerCandidate)) {
      return GAME_RESULT.WIN;
    }

    return GAME_RESULT.LOSS;
  }

  private static calculateTieBets(
    gameResults: Array<{ candidate: GameCandidate; betValue: number; result: GameResult }>,
  ): number {
    return gameResults.reduce((prev, item) => {
      if (item.result === GAME_RESULT.TIE) {
        return prev + item.betValue;
      }

      return prev;
    }, 0);
  }

  public static calculateWinValue(
    gameResults: Array<{ candidate: GameCandidate; betValue: number; result: GameResult }>,
  ): number {
    let betValue: number;
    let tieBets: number = 0;

    if (gameResults.length === 1) {
      betValue = this.calculateTotalBetValue(gameResults);
    } else {
      console.log('calclulate win value for multiple game results.', gameResults);
      betValue = this.calculateTotalBetWithWinConditions(gameResults);
      tieBets = this.calculateTieBets(gameResults);
    }

    const multiplier = GAME_CONFIG.winningRates[gameResults.length];

    return betValue * multiplier - tieBets;
  }

  public static getFinishedGameState(
    results: Array<{ betValue: number; result: GameResult }>,
  ): GameResult {
    if (results.length === 1) {
      return results[0].result;
    }

    const hasWins = results.some((result) => result.result === GAME_RESULT.WIN);

    if (hasWins) {
      return GAME_RESULT.WIN;
    }

    return GAME_RESULT.LOSS;
  }
}

export { GameService };
