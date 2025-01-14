import { configureStore } from '@reduxjs/toolkit';

import { GAME_SLICE_NAME, gameSliceReducer } from '@/store/slices/gameSlice';

import { APP_SLICE_NAME, appSliceReducer } from './slices/appSlice';

export const initializeStore = () =>
  configureStore({
    reducer: {
      [GAME_SLICE_NAME]: gameSliceReducer,
      [APP_SLICE_NAME]: appSliceReducer,
    },
  });

const store = initializeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store };
