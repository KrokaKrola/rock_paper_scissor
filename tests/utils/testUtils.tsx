import React from 'react';

import { ROUTES } from '@/constants/routes';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { Layout } from '@/components/Layout/Layout';

import { initializeStore } from '@/store/store';

const appRender = (element: React.JSX.Element) => {
  const store = initializeStore();
  const router = createMemoryRouter([
    {
      element: <Layout />,
      children: [
        {
          path: ROUTES.HOME,
          element,
        },
      ],
    },
  ]);

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  );
};

export { appRender };
