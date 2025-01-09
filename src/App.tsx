import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Home } from '@/pages/Home/Home';
import { NotFound } from '@/pages/NotFound/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
