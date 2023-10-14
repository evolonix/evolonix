import clsx from 'clsx';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  NavLink,
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import App from './app/app';
import ErrorPage from './app/error';
import { Category, Preview } from './data/preview.model';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      {
        path: 'dashboard',
        handle: {
          crumb: () => (
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                clsx(
                  isActive
                    ? 'text-slate-700 dark:text-slate-200'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                  'ml-4 text-sm font-medium'
                )
              }
            >
              Dashboard
            </NavLink>
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
              const { loader } = await import('./app/dashboard/category');
              return { loader };
            },
            handle: {
              crumb: ({ category }: { category: Category }) => (
                <NavLink
                  to={`/dashboard/${category.id}`}
                  end
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? 'text-slate-700 dark:text-slate-200'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                      'ml-4 text-sm font-medium'
                    )
                  }
                >
                  {category.name}
                </NavLink>
              ),
            },
            children: [
              {
                index: true,
                lazy: () => import('./app/dashboard/category'),
              },
              {
                path: ':previewId',
                lazy: () => import('./app/previews'),
                handle: {
                  crumb: ({
                    category,
                    preview,
                  }: {
                    category: Category;
                    preview: Preview;
                  }) => (
                    <NavLink
                      to={`/dashboard/${category.id}/${preview.id}`}
                      end
                      className={({ isActive }) =>
                        clsx(
                          isActive
                            ? 'text-slate-700 dark:text-slate-200'
                            : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
                          'ml-4 text-sm font-medium'
                        )
                      }
                    >
                      {preview.name}
                    </NavLink>
                  ),
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
