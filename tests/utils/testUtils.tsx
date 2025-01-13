import React from 'react';

import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '@/store/store';

const appRender = (element: React.JSX.Element) => {
  return render(<Provider store={store}>{element}</Provider>);
};

export { appRender };
