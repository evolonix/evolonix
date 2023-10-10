import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from './app/app';
import ErrorPage from './app/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        lazy: () => import('./app/dashboard'),
        errorElement: <ErrorPage />,
      },
      {
        path: 'previews',
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/" /> },
          {
            path: ':id',
            lazy: () => import('./app/previews'),
          },
        ],
      },
    ],
  },
  {
    path: 'previews/:id/fullscreen',
    lazy: () => import('./app/fullscreen'),
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
