import { ForwardedRef, forwardRef } from 'react';
import { NavLink } from 'react-router-dom';
import { Category, Preview } from '../data/preview.model';

export const PreviewCard = forwardRef(
  (
    {
      category,
      preview,
    }: {
      category: Category;
      preview: Preview;
    },
    forwardedRef: ForwardedRef<HTMLAnchorElement>
  ) => {
    return (
      <NavLink
        ref={forwardedRef}
        key={`${category.id}-${preview.id}`}
        to={`/dashboard/${category.id}/${preview.id}`}
        className="block overflow-hidden rounded-lg bg-white shadow ring-sky-400 transition hover:scale-105 focus:outline-none focus:ring-2 dark:bg-slate-950 dark:shadow-black"
      >
        <div className="relative aspect-video rounded-t-lg border-b border-slate-200 dark:border-slate-800">
          <img
            className="absolute h-full w-full object-cover object-top"
            src={preview.image}
            alt=""
          />
          {/* <iframe
          src={preview.url}
          title={preview.name}
          className="overflow-hiddden pointer-events-none h-full w-full rounded-t-lg"
        /> */}
        </div>
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-base font-semibold leading-6">{preview.name}</h3>
        </div>
      </NavLink>
    );
  }
);
