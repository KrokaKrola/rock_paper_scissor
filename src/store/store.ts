import { configureStore } from '@reduxjs/toolkit';

import { GAME_SLICE_NAME, gameSliceReducer } from '@/store/slices/gameSlice';

const store = configureStore({
  reducer: {
    [GAME_SLICE_NAME]: gameSliceReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export { store };
