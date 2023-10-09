import { NavLink } from 'react-router-dom';
import { Preview } from '../data/preview.model';

export const Nav = ({ previews }: { previews?: Preview[] }) => {
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
        <li>
          <NavLink
            to="/previews/preview-1"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Preview 1
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/previews/preview-2"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Preview 2
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/previews/preview-3"
            className={({ isActive }) =>
              isActive ? 'underline' : 'hover:underline'
            }
          >
            Preview 3
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
