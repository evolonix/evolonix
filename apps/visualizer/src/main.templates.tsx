import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './app/error';
import { Template, loader as templateLoader } from './templates/template';

const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <ErrorPage />,
      children: [
        {
          path: ':categoryId/:previewId',
          element: <Template />,
          loader: templateLoader,
        },
      ],
    },
  ],
  { basename: '/templates' }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
