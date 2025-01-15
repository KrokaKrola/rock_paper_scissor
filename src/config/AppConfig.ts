import { GAME_CANDIDATES, GameCandidate } from '@/constants/gameCandidates';

class AppConfig {
  private static _initialBalance: number = 5_000;

  private static _betValue: number = 500;

  private static _winningRates: Record<string, number> = {
    1: 14,
    2: 3,
  };

  private static _gameCandidatesWinningMap: Record<GameCandidate, Array<GameCandidate>> = {
    [GAME_CANDIDATES.ROCK]: [GAME_CANDIDATES.SCISSORS],
    [GAME_CANDIDATES.PAPER]: [GAME_CANDIDATES.ROCK],
    [GAME_CANDIDATES.SCISSORS]: [GAME_CANDIDATES.PAPER],
  };

  private static _maximumSimultaneousCandidates: number = 2;

  private static _maximumBetValue: number = 10_000;

  public static get initialBalance(): number {
    return this._initialBalance;
  }

  public static set initialBalance(value: number) {
    this._initialBalance = value;
  }

  public static get betValue(): number {
    return this._betValue;
  }

  public static set betValue(value: number) {
    this._betValue = value;
  }

  public static get winningRates(): Record<string, number> {
    return this._winningRates;
  }

  public static set winningRates(value: Record<string, number>) {
    this._winningRates = value;
  }

  public static get gameCandidatesWinningMap(): Record<GameCandidate, Array<GameCandidate>> {
    return this._gameCandidatesWinningMap;
  }

  public static set gameCandidatesWinningMap(value: Record<GameCandidate, Array<GameCandidate>>) {
    this._gameCandidatesWinningMap = value;
  }

  public static get maximumSimultaneousCandidates(): number {
    return this._maximumSimultaneousCandidates;
  }

  public static set maximumSimultaneousCandidates(value: number) {
    this._maximumSimultaneousCandidates = value;
  }

  public static get maximumBetValue(): number {
    return this._maximumBetValue;
  }

  public static set maximumBetValue(value: number) {
    this._maximumBetValue = value;
  }
}

export { AppConfig };
