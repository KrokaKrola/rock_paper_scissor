import { StrictMode } from 'react';

import { GAME_CONFIG } from '@/config/gameConfig';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

import { AppRouter } from './AppRouter';
import './main.scss';

const startApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </StrictMode>,
  );
};

const validateGameConfig = () => {
  if (GAME_CONFIG.maximumSimultaneousCandidates !== Object.keys(GAME_CONFIG.winningRates).length) {
    alert('Invalid winning rates for maximum simultaneous candidates. This values must be equal');

    return;
  }

  if (Object.keys(GAME_CONFIG.gameCandidatesWinningMap).length < 2) {
    alert('game candidates winning map must be more than 2!');

    return;
  }

  if (
    !GAME_CONFIG.initialBalance ||
    !GAME_CONFIG.betValue ||
    !GAME_CONFIG.maximumBetValue ||
    !GAME_CONFIG.maximumSimultaneousCandidates
  ) {
    alert('one of the required game config params are missing');

    return;
  }
};

const main = () => {
  validateGameConfig();
  startApp();
};

main();
