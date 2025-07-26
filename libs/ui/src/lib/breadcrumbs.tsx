// Breadcrumbs.tsx
import React from 'react';
import { Link, matchPath, Params, useLocation } from 'react-router';

export type BreadcrumbFn = (params: Params<string>) => string;
export type BreadcrumbMap = Record<string, string | BreadcrumbFn>;

function humanize(segment: string): string {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export const Breadcrumbs: React.FC<{ breadcrumbMap: BreadcrumbMap }> = ({
  breadcrumbMap,
}) => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const crumbs = segments.map((_, i) => {
    const path = '/' + segments.slice(0, i + 1).join('/');

    // Try exact matches
    let label: string | undefined;

    for (const pattern in breadcrumbMap) {
      const match = matchPath({ path: pattern, end: true }, path);
      if (match) {
        const entry = breadcrumbMap[pattern];
        if (typeof entry === 'function') {
          label = entry(match.params);
        } else {
          label = entry;
        }
        break;
      }
    }

    return {
      path,
      label: label ?? humanize(segments[i]),
    };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-2 text-sm text-zinc-600">
        <li>
          <Link
            to="/"
            className="text-zinc-950 hover:text-cyan-700 dark:text-white dark:hover:text-cyan-500"
          >
            Home
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-2">
            <span>/</span>
            {i === crumbs.length - 1 ? (
              <span className="text-zinc-600 dark:text-zinc-400">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-zinc-950 hover:text-cyan-700 dark:text-white dark:hover:text-cyan-500"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
