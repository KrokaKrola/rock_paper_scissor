import { AppConfig } from '@/config/AppConfig';
import { GAME_CANDIDATES } from '@/constants/gameCandidates';
import { act, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Home } from '@/pages/Home/Home';

import { CandidatesService } from '@/services/CandidatesService';

import { appRender } from '../utils/testUtils';

const testIds = {
  rock: 'ROCK-card',
  paper: 'PAPER-card',
  scissors: 'SCISSORS-card',
  balanceLabel: 'balance',
  betLabel: 'bet',
  winLabel: 'win',
  playGame: 'play-game',
  cancelBet: 'cancel-bet',
  resetGame: 'reset-game',
  playerWinOutline: 'player-win-outline',
  tieOutline: 'tie-outline',
  computerWinOutline: 'computer-win-outline',
};

describe('Home', () => {
  describe('common', () => {
    it('should correctly count bet and deduct it from balance for single candidate', async () => {
      const res = appRender(<Home />);

      fireEvent.click(res.getByTestId(testIds.rock));

      expect(res.getByTestId(testIds.betLabel).textContent).toEqual(AppConfig.betValue.toString());
      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance - AppConfig.betValue).toString(),
      );
    });

    it('should correctly count bet and deduct it from balance for multiple candidates', async () => {
      const res = appRender(<Home />);

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.paper));

      expect(res.getByTestId(testIds.betLabel).textContent).toEqual(
        (AppConfig.betValue * 2).toString(),
      );
      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance - AppConfig.betValue * 2).toString(),
      );
    });

    it('should not be able to click on the third candidate when another ones have active bets', async () => {
      const res = appRender(<Home />);

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.paper));

      expect(res.getByTestId(testIds.scissors).getAttribute('disabled')).toEqual('');
    });

    it('should not be able to place a bet more than balance value', () => {
      const res = appRender(<Home />);

      for (let i = 0; i < 11; i++) {
        fireEvent.click(res.getByTestId(testIds.rock));
      }

      expect(res.getByTestId(testIds.betLabel).textContent).toEqual(
        AppConfig.initialBalance.toString(),
      );
      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual('0');

      expect(res.getByTestId(testIds.rock).getAttribute('disabled')).toEqual('');
      expect(res.getByTestId(testIds.paper).getAttribute('disabled')).toEqual('');
      expect(res.getByTestId(testIds.scissors).getAttribute('disabled')).toEqual('');
    });

    it('should cancel bet and return it to the balance after Cancel btn click', () => {
      const res = appRender(<Home />);

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.paper));

      fireEvent.click(res.getByTestId(testIds.cancelBet));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        AppConfig.initialBalance.toString(),
      );
      expect(res.getByTestId(testIds.betLabel).textContent).toEqual('0');
    });

    it('should start a game on play click and disable all candidates', () => {
      const res = appRender(<Home />);

      fireEvent.click(res.getByTestId(testIds.rock));

      fireEvent.click(res.getByTestId(testIds.playGame));

      expect(res.getByTestId(testIds.rock).getAttribute('disabled')).toEqual('');
      expect(res.getByTestId(testIds.paper).getAttribute('disabled')).toEqual('');
      expect(res.getByTestId(testIds.scissors).getAttribute('disabled')).toEqual('');
    });
  });

  describe('single candidate bet', () => {
    it('should add win value to the balance if result of the game is win', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.SCISSORS,
      );

      fireEvent.click(res.getByTestId(testIds.rock));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      const winValue = AppConfig.betValue * AppConfig.winningRates[1];

      expect(res.getByTestId(testIds.playerWinOutline)).not.toBeNull();
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual(winValue.toString());

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance + winValue).toString(),
      );
      expect(res.getByTestId(testIds.betLabel).textContent).toEqual('0');
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');
    });

    it('should add win value to the balance if result of the game is win and game has multiple bets on a single candidate', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.SCISSORS,
      );

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.rock));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      const winValue = 2 * AppConfig.betValue * AppConfig.winningRates[1];

      expect(res.getByTestId(testIds.winLabel).textContent).toEqual(winValue.toString());

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance + winValue).toString(),
      );
    });

    it('should return bet value to user balance if result of the game is tie', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.ROCK,
      );

      fireEvent.click(res.getByTestId(testIds.rock));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      expect(res.getByTestId(testIds.tieOutline)).not.toBeNull();
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        AppConfig.initialBalance.toString(),
      );
      expect(res.getByTestId(testIds.betLabel).textContent).toEqual('0');
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');
    });

    it('should deduct bet value from the balance if result of the game is loss', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.PAPER,
      );

      fireEvent.click(res.getByTestId(testIds.rock));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      expect(res.getByTestId(testIds.computerWinOutline)).not.toBeNull();
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance - AppConfig.betValue).toString(),
      );
      expect(res.getByTestId(testIds.betLabel).textContent).toEqual('0');
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');
    });
  });

  describe('multiple candidate bet', () => {
    it('should add win value to the balance if result of the game is win, with tie bet counted as a loss', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.SCISSORS,
      );

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.scissors));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      const winValue = AppConfig.betValue * AppConfig.winningRates[2];

      expect(res.getByTestId(testIds.playerWinOutline)).not.toBeNull();
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual(winValue.toString());

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance + winValue - AppConfig.betValue).toString(),
      );
      expect(res.getByTestId(testIds.betLabel).textContent).toEqual('0');
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');
    });

    it('should add win value to the balance if result of the game is win, with tie bet counted as a loss and with multiple bets on a single candidate', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.SCISSORS,
      );

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.scissors));
      fireEvent.click(res.getByTestId(testIds.scissors));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      const winValue = AppConfig.betValue * AppConfig.winningRates[2];

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance + winValue - AppConfig.betValue * 2).toString(),
      );
    });

    it('should deduct bet value from the balance if result of the game is loss', () => {
      const res = appRender(<Home />);

      vi.useFakeTimers();
      vi.spyOn(CandidatesService, 'generateComputerCandidate').mockImplementationOnce(
        () => GAME_CANDIDATES.ROCK,
      );

      fireEvent.click(res.getByTestId(testIds.rock));
      fireEvent.click(res.getByTestId(testIds.scissors));

      fireEvent.click(res.getByTestId(testIds.playGame));

      act(() => {
        vi.runAllTimers();
      });

      expect(res.getByTestId(testIds.computerWinOutline)).not.toBeNull();
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');

      fireEvent.click(res.getByTestId(testIds.resetGame));

      expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual(
        (AppConfig.initialBalance - AppConfig.betValue * 2).toString(),
      );
      expect(res.getByTestId(testIds.betLabel).textContent).toEqual('0');
      expect(res.getByTestId(testIds.winLabel).textContent).toEqual('0');
    });
  });
});
