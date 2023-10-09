import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink
            to="/previews/preview-1"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Preview1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/previews/preview-2"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Preview2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/previews/preview-3"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Preview3
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
