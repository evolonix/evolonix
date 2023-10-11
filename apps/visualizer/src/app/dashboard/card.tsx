import { NavLink } from 'react-router-dom';
import { Preview } from '../../data/preview.model';

export const PreviewCard = ({
  categoryId,
  preview,
}: {
  categoryId: string;
  preview: Preview;
}) => {
  return (
    <NavLink
      key={`${categoryId}-${preview.id}`}
      to={`/previews/${categoryId}/${preview.id}`}
      className="block overflow-hidden sm:rounded-lg sm:shadow dark:sm:shadow-black"
    >
      <div className="border-b border-gray-200 bg-white px-4 py-5 dark:border-gray-800 dark:bg-black sm:px-6">
        <h3 className="text-base font-semibold leading-6">{preview.name}</h3>
      </div>
    </NavLink>
  );
};
