import { ROUTES } from '@/constants/routes';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '@/pages/Home/Home';
import { NotFound } from '@/pages/NotFound/NotFound';

import { Layout } from '@/components/Layout/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTES.HOME,
        element: <Home withPagePreloader />,
      },
      {
        path: ROUTES.WILDCARD,
        element: <NotFound />,
      },
    ],
  },
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export { AppRouter };
