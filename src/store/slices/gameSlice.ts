import { GAME_CONFIG, GameCandidate } from '@/config/game';
import { GAME_RESULT, GameResult } from '@/constants/gameResult';
import { GAME_STATUS, GameStatus } from '@/constants/gameStatus';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GameService } from '@/services/GameService';
import { BetDto } from '@/services/dtos/bet';
import { BetWithGameResultDto } from '@/services/dtos/betWithGameResult';

interface GameState {
  balance: number;
  bets: Array<BetDto>;
  status: GameStatus;
  winValue: number;
  result: GameResult | null;
}

const GAME_SLICE_NAME = 'game';

const initialState: GameState = {
  balance: GAME_CONFIG.initialBalance,
  bets: GameService.getGameCandidates().map((candidate) => ({
    candidate,
    value: 0,
  })),
  status: GAME_STATUS.WAITING_FOR_BETS,
  winValue: 0,
  result: null,
};

const { reducer: gameSliceReducer, actions: gameSliceActions } = createSlice({
  name: GAME_SLICE_NAME,
  initialState,
  reducers: {
    handleAddBet: (state, { payload }: PayloadAction<GameCandidate>) => {
      const isAllowedToPlaceBet = GameService.isAllowedToPlaceBet(
        state.bets,
        state.balance,
        payload,
      );

      if (!isAllowedToPlaceBet) {
        return;
      }

      const candidateIndex = state.bets.findIndex((item) => item.candidate === payload);

      state.bets[candidateIndex] = {
        ...state.bets[candidateIndex],
        value: state.bets[candidateIndex].value + GAME_CONFIG.betValue,
      };
    },
    handleFinishGame: (state, { payload }: PayloadAction<Array<BetWithGameResultDto>>) => {
      const result = GameService.getCompletedGameResult(payload);

      if (result === GAME_RESULT.WIN) {
        state.winValue += GameService.calculateWinValue(payload);
      }

      state.status = GAME_STATUS.FINISHED;
      state.result = result;
    },
    handleGameStatus: (state, action: PayloadAction<GameStatus>) => {
      state.status = action.payload;
    },
    handleResetGame: (state) => {
      if (state.result === GAME_RESULT.WIN) {
        state.balance += state.winValue;
      } else if (state.result === GAME_RESULT.LOSS) {
        const betValue = GameService.calculateTotalBetValue(state.bets);
        state.balance -= betValue;
      }

      state.bets = initialState.bets;
      state.winValue = initialState.winValue;
      state.status = initialState.status;
      state.result = initialState.result;
    },
  },
});

export { GAME_SLICE_NAME, gameSliceReducer, gameSliceActions };
