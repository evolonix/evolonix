import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router';

import App from './app/app';
import Auth from './app/auth';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<div>App Error</div>}>
      <Route path="auth/*" element={<Auth />} />
      <Route path="*" element={<App />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
