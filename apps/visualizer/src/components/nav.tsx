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
        {previews?.map((preview) => (
          <li key={preview.id}>
            <NavLink
              to={`/previews/${preview.id}`}
              className={({ isActive }) =>
                isActive ? 'underline' : 'hover:underline'
              }
            >
              {preview.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
