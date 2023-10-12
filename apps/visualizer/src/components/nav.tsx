import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              clsx(
                isActive
                  ? 'bg-gray-100 text-gray-950 dark:bg-gray-800 dark:text-white'
                  : 'text-gray-600 hover:bg-gray-200 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                'rounded-md px-3 py-2 text-sm font-medium'
              )
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
