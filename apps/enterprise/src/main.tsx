import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';

import App from './app/app';
import { buildInjector } from './injector';

buildInjector();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="*"
      element={<App />}
      errorElement={<div>Error loading app</div>}
    />,
  ),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
