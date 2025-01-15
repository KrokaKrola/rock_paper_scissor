import { StrictMode } from 'react';

import { applyConfig } from '@/config/applyConfig';
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

const main = () => {
  applyConfig('DEV');
  startApp();
};

main();
