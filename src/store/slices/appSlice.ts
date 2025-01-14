import { createSlice } from '@reduxjs/toolkit';

interface AppState {
  isVolumeEnabled: boolean;
}

const APP_SLICE_NAME = 'app';

const initialState: AppState = {
  isVolumeEnabled: true,
};

const { reducer: appSliceReducer, actions: appSliceActions } = createSlice({
  name: APP_SLICE_NAME,
  initialState,
  reducers: {
    switchVolume: (state) => {
      state.isVolumeEnabled = !state.isVolumeEnabled;
    },
  },
});

export { APP_SLICE_NAME, appSliceActions, appSliceReducer };
