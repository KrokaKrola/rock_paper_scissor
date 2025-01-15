import { AppConfig } from '@/config/AppConfig';
import { GameCandidate } from '@/constants/gameCandidates';
import { GAME_RESULT, GameResult } from '@/constants/gameResult';
import { GAME_STATUS, GameStatus } from '@/constants/gameStatus';
import { Nullable } from '@/types/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { BetService } from '@/services/BetService';
import { CandidatesService } from '@/services/CandidatesService';
import { GameService } from '@/services/GameService';
import { BetDto } from '@/services/dtos/bet';
import { BetWithGameResultDto } from '@/services/dtos/betWithGameResult';

interface GameState {
  balance: number;
  bets: Array<BetDto>;
  betsWithGameResultDto: Array<BetWithGameResultDto>;
  status: GameStatus;
  winValue: number;
  result: Nullable<GameResult>;
  computerCandidate: Nullable<GameCandidate>;
}

const GAME_SLICE_NAME = 'game';

const initialState: GameState = {
  balance: AppConfig.initialBalance,
  bets: CandidatesService.getGameCandidates().map((candidate) => ({
    candidate,
    value: 0,
  })),
  betsWithGameResultDto: [],
  status: GAME_STATUS.WAITING_FOR_BETS,
  winValue: 0,
  result: null,
  computerCandidate: null,
};

const { reducer: gameSliceReducer, actions: gameSliceActions } = createSlice({
  name: GAME_SLICE_NAME,
  initialState,
  reducers: {
    handleAddBet: (state, { payload }: PayloadAction<GameCandidate>) => {
      const betCandidateIdx = state.bets.findIndex((item) => item.candidate === payload);

      state.bets[betCandidateIdx] = {
        ...state.bets[betCandidateIdx],
        value: state.bets[betCandidateIdx].value + AppConfig.betValue,
      };
    },
    handleGameStart: (state) => {
      state.status = GAME_STATUS.IN_PROGRESS;
      state.computerCandidate = CandidatesService.generateComputerCandidate();

      state.betsWithGameResultDto = BetService.calculateBetsWithGameResults(
        state.bets,
        state.computerCandidate,
      );
    },
    handleFinishGame: (state) => {
      const result = GameService.getCompletedGameResult(state.betsWithGameResultDto);

      if (result === GAME_RESULT.WIN) {
        state.winValue = GameService.calculateWinValue(state.betsWithGameResultDto);
      }

      state.status = GAME_STATUS.FINISHED;
      state.result = result;
    },
    handleResetGame: (state) => {
      if (state.result === GAME_RESULT.WIN) {
        state.balance += GameService.calculateNewBalance(
          state.winValue,
          state.betsWithGameResultDto,
        );
      } else if (state.result === GAME_RESULT.LOSS) {
        state.balance -= BetService.calculateTotalBetValue(state.bets);
      }

      state.bets = initialState.bets;
      state.winValue = initialState.winValue;
      state.status = initialState.status;
      state.result = initialState.result;
      state.betsWithGameResultDto = initialState.betsWithGameResultDto;
      state.computerCandidate = initialState.computerCandidate;
    },
    handleCancelBets: (state) => {
      state.bets = initialState.bets;
    },
  },
});

export { GAME_SLICE_NAME, gameSliceReducer, gameSliceActions };
