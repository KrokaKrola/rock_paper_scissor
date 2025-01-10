import { GAME_CONFIG, GameCandidate } from '@/config/game';
import { GAME_RESULT, GameResult } from '@/constants/gameResult';
import { GAME_STATUS, GameStatus } from '@/constants/gameStatus';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameService } from '@/services/GameService';

interface GameState {
  balance: number;
  betValue: number;
  bets: Array<{ candidate: GameCandidate; betValue: number }>;
  status: GameStatus;
  winValue: number;
  gameResult: GameResult | null;
}

const GAME_SLICE_NAME = 'game';

const initialState: GameState = {
  balance: GAME_CONFIG.initialBalance,
  betValue: GAME_CONFIG.betValue,
  bets: GameService.getGameCandidates().map((candidate) => ({
    candidate,
    betValue: 0,
  })),
  status: GAME_STATUS.WAITING_FOR_BETS,
  winValue: 0,
  gameResult: null,
};

const { reducer: gameSliceReducer, actions: gameSliceActions } = createSlice({
  name: GAME_SLICE_NAME,
  initialState,
  reducers: {
    handleAddBet: (state, action: PayloadAction<{ candidate: GameCandidate }>) => {
      const isAllowedToPlaceBet = GameService.isAllowedToPlaceBet(
        state.bets,
        state.balance,
        action.payload.candidate,
      );

      if (!isAllowedToPlaceBet) {
        return;
      }

      const candidateIndex = state.bets.findIndex(
        (item) => item.candidate === action.payload.candidate,
      );

      state.bets[candidateIndex] = {
        ...state.bets[candidateIndex],
        betValue: state.bets[candidateIndex].betValue + GAME_CONFIG.betValue,
      };
    },
    handleFinishGame: (
      state,
      {
        payload: { gameResult },
      }: PayloadAction<{
        gameResult: Array<{ candidate: GameCandidate; betValue: number; result: GameResult }>;
      }>,
    ) => {
      const result = GameService.getFinishedGameState(gameResult);

      if (result === GAME_RESULT.WIN) {
        alert('win');
        state.winValue += GameService.calculateWinValue(gameResult);
      } else if (result === GAME_RESULT.TIE) {
        alert('tie');
      } else {
        alert('loss');
      }

      state.status = GAME_STATUS.FINISHED;
      state.gameResult = result;
    },
    handleGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    handleResetGame: (state) => {
      if (state.gameResult === GAME_RESULT.WIN) {
        state.balance += state.winValue;
      } else if (state.gameResult === GAME_RESULT.LOSS) {
        const betValue = GameService.calculateTotalBetValue(state.bets);
        state.balance -= betValue;
      }

      state.bets = initialState.bets;
      state.winValue = initialState.winValue;
      state.status = initialState.status;
      state.gameResult = initialState.gameResult;
    },
  },
});

export { GAME_SLICE_NAME, gameSliceReducer, gameSliceActions };
