import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
