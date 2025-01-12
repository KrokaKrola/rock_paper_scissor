import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, it } from 'vitest';

import { Home } from '@/pages/Home/Home';

import { store } from '@/store/store';

describe('Home', () => {
  it('renders without crashing', () => {
    const res = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    );

    res.debug();
  });
});
