import clsx from 'clsx';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  NavLink,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App, { loader as appLoader } from './app/app';
import ErrorPage from './app/error';
import { Breadcrumbs, Crumb } from './components';
import CrumbDropdown from './components/crumb-dropdown';
import { Category, Preview } from './data';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: appLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      {
        path: 'dashboard',
        handle: {
          crumb: () => <Crumb name="Dashboard" to="/dashboard" />,
          navigation: ({
            navigation,
          }: {
            navigation: { name: string; to: string }[];
          }) => (
            <nav
              className="hidden lg:flex lg:flex-wrap lg:gap-x-8 lg:gap-y-2 lg:py-2"
              aria-label="Local"
            >
              {navigation.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                        : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-50',
                      'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          ),
        },
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            lazy: () => import('./app/dashboard'),
          },
          {
            path: ':categoryId',
            async lazy() {
              const { loader } = await import('./app/categories');
              return { loader };
            },
            handle: {
              crumb: ({ category }: { category: Category }) => (
                <Crumb name={category.name} to={`/dashboard/${category.id}`} />
              ),
              navigation: ({
                navigation,
              }: {
                navigation: { name: string; to: string }[];
              }) => (
                <nav
                  className="hidden flex-wrap gap-x-8 gap-y-2 py-2 lg:flex"
                  aria-label="Local"
                >
                  {navigation.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        clsx(
                          isActive
                            ? 'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50'
                            : 'text-slate-900 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-50 dark:hover:bg-slate-900 dark:hover:text-slate-50',
                          'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium'
                        )
                      }
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              ),
            },
            children: [
              {
                index: true,
                lazy: () => import('./app/categories'),
              },
              {
                path: ':previewId',
                lazy: () => import('./app/previews'),
                handle: {
                  crumb: ({
                    preview,
                    navigation,
                  }: {
                    preview: Preview;
                    navigation: { name: string; to: string }[];
                  }) => (
                    <CrumbDropdown preview={preview} navigation={navigation} />
                  ),
                  navigation: () => <Breadcrumbs />,
                },
              },
            ],
          },
        ],
      },
    ],
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
