import { AppConfig } from '@/config/AppConfig';
import devConfig from '@/config/dev.json';
import testConfig from '@/config/test.json';
import { GameCandidate } from '@/constants/gameCandidates';

const applyConfig = (env: 'DEV' | 'TEST') => {
  let config: typeof devConfig | typeof testConfig;

  if (env === 'DEV') {
    config = devConfig;
  } else if (env === 'TEST') {
    config = testConfig;
  } else {
    throw new Error(`Unable to load config: ${env}`);
  }

  if (config.betValue) {
    AppConfig.betValue = devConfig.betValue;
  }

  if (devConfig.initialBalance) {
    AppConfig.initialBalance = devConfig.initialBalance;
  }

  if (devConfig.winningRates) {
    AppConfig.winningRates = devConfig.winningRates;
  }

  if (devConfig.maximumSimultaneousCandidates) {
    AppConfig.maximumSimultaneousCandidates = devConfig.maximumSimultaneousCandidates;
  }

  if (devConfig.gameCandidatesWinningMap) {
    AppConfig.gameCandidatesWinningMap = devConfig.gameCandidatesWinningMap as Record<
      GameCandidate,
      Array<GameCandidate>
    >;
  }
};

export { applyConfig };
