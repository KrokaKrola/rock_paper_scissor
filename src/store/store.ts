import { configureStore } from '@reduxjs/toolkit';

import { GAME_SLICE_NAME, gameSliceReducer } from '@/store/slices/gameSlice';

export const initializeStore = () =>
  configureStore({
    reducer: {
      [GAME_SLICE_NAME]: gameSliceReducer,
    },
  });

const store = initializeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store };
