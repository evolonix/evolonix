import { NavLink } from 'react-router-dom';
import { Preview } from '../../data/preview.model';

export const PreviewCard = ({ preview }: { preview: Preview }) => {
  return (
    <NavLink
      key={preview.id}
      to={`/previews/${preview.id}`}
      className="block overflow-hidden bg-white sm:rounded-lg sm:shadow"
    >
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          {preview.name}
        </h3>
      </div>
    </NavLink>
  );
};
