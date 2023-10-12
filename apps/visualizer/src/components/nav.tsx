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
                  ? 'bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white'
                  : 'text-slate-600 hover:bg-slate-200 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white',
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
