import { describe, it } from 'vitest';

import { Home } from '@/pages/Home/Home';

import { appRender } from '../utils/testUtils';

describe('Home', () => {
  it('renders without crashing', () => {
    const res = appRender(<Home />);

    res.debug();
  });
});
