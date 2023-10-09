import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App, { loader as appLoader } from './app/app';
import { Dashboard } from './app/dashboard/dashboard';
import ErrorPage from './app/error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard />, errorElement: <ErrorPage /> },
      {
        path: 'previews',
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Navigate to="/" /> },
          {
            path: ':id',
            lazy: () => import('./app/previews/detail'),
          },
        ],
      },
    ],
  },
  {
    path: 'previews/:id/fullscreen',
    lazy: () => import('./app/fullscreen/detail'),
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
