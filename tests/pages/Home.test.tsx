import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Home } from '@/pages/Home/Home';

import { appRender } from '../utils/testUtils';

const testIds = {
  rock: 'ROCK-card',
  paper: 'PAPER-card',
  scissors: 'SCISSORS-card',
  balanceLabel: 'balance',
  betLabel: 'bet',
  winLabel: 'win',
};

// TODO: move test-ids in reusable object
describe('Home', () => {
  it('should correctly count bet and deduct it from balance for single candidate', async () => {
    const res = appRender(<Home />);

    fireEvent.click(res.getByTestId(testIds.rock));

    expect(res.getByTestId(testIds.betLabel).textContent).toEqual('500');
    expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual('4500');
  });

  it('should correctly count bet and deduct it from balance for multiple candidates', async () => {
    const res = appRender(<Home />);

    fireEvent.click(res.getByTestId(testIds.rock));
    fireEvent.click(res.getByTestId(testIds.paper));

    expect(res.getByTestId(testIds.betLabel).textContent).toEqual('1000');
    expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual('4000');
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

    expect(res.getByTestId(testIds.betLabel).textContent).toEqual('5000');
    expect(res.getByTestId(testIds.balanceLabel).textContent).toEqual('0');

    expect(res.getByTestId(testIds.rock).getAttribute('disabled')).toEqual('');
    expect(res.getByTestId(testIds.paper).getAttribute('disabled')).toEqual('');
    expect(res.getByTestId(testIds.scissors).getAttribute('disabled')).toEqual('');
  });

  it.todo('should start a game on play click and disable all candidates');

  describe('single candidate bet', () => {
    it.todo('should add win value to the balance if result of the game is win');

    it.todo('should return bet value to user balance if result of the game is tie');

    it.todo('should deduct bet value from the balance if result of the game is loss');
  });

  describe('multiple candidate bet', () => {
    it.todo(
      'should add win value to the balance if result of the game is win, with tie bet counted as a loss',
    );

    it.todo('should deduct bet value from the balance if result of the game is loss');
  });
});
